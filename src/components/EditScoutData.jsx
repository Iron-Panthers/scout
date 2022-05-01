import SetPanel from "./inputs/SetPanel"
import { Context } from "../state"
import React, { useContext, useMemo, useState } from "react"
import { filterState } from "../csv"
import get from "lodash.get"

import "./EditScoutData.scss"

const elementTypes = Object.freeze({
  Number: "Number",
  String: "String",
  Boolean: "Boolean",
  Undefined: "Undefined",
  Null: "Null",
  Object: "Object",
})

const DataButton = ({ label, value, disabled, fn }) => {
  const button = (val, type) => (
    <button
      className={`${type} label`}
      disabled={disabled}
      onClick={() => {
        fn(type)
      }}
    >{`${label}: ${val}`}</button>
  )

  // this set of code prevents react from messing up our data by assuming we dont wanna render anything
  if (Number.isFinite(value))
    return button(value.toString(), elementTypes.Number)
  else if (value === false || value === true)
    return button(value.toString(), elementTypes.Boolean)
  else if (value === null) return button("null", elementTypes.Null)
  else if (value === undefined)
    return button("undefined", elementTypes.Undefined)
  return button(`"${value}"`, elementTypes.String)
}

const LabelGroup = React.memo(
  ({ label, obj, selected, setSelected, parent }) => {
    const [hidden, setHidden] = useState(true)

    return (
      <div className={`labelGroup${hidden ? " hidden" : ""}`}>
        <button
          className="Object label"
          onClick={() => {
            setHidden((previousVal) => !previousVal)
          }}
        >{`${label}: (tap to ${hidden ? "expand" : "collapse"})`}</button>
        {objectVisualizer(obj, selected, setSelected, parent)}
      </div>
    )
  }
)

const objectVisualizer = (obj, selected, setSelected, parent = "") =>
  Object.entries(obj).map(([key, value]) => {
    const path = `${parent}${parent === "" ? "" : "."}${key}`

    if (Object(value) === value) {
      // is an object, we need to go deeper
      return (
        <LabelGroup
          obj={value}
          label={key}
          selected={selected}
          setSelected={setSelected}
          parent={path}
          key={key}
        />
      )
    }

    return (
      <DataButton
        key={key}
        label={key}
        value={value}
        disabled={selected === path}
        fn={(type) => {
          setSelected({ path, type })
        }}
      />
    )
  })

const TypedInput = ({ type, value, onChange }) => {
  switch (type) {
    case elementTypes.Number:
      return <input type="number" {...{ value, onChange }}></input>
    case elementTypes.Null:
    case elementTypes.Undefined:
    case elementTypes.String:
    default:
      return <input type="text" {...{ value, onChange }}></input>
  }
}

const ElementEditor = ({ selected: { path, type } }) => {
  const [state, dispatch] = useContext(Context)

  return (
    <div className="ElementEditor">
      <p>
        {path === undefined
          ? "select a value to edit"
          : `editing value (${type}): ${path}`}
      </p>
      <TypedInput type={type} value={get(state, path)} />
    </div>
  )
}

const EditScoutData = () => {
  const [state] = useContext(Context)
  const [selected, setSelected] = useState({ path: undefined, type: undefined })

  // console.log(state)

  const data = useMemo(
    () => objectVisualizer(filterState(state), selected, setSelected),
    [state, selected, setSelected]
  )

  return (
    <>
      <div className="DataEditor">{data}</div>
      <ElementEditor selected={selected} />
      <SetPanel wide label="Done" panelName="Review" />
    </>
  )
}

export default EditScoutData
