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

/**
 * get the type of primitive
 * @param {Number|String|Boolean|Undefined|Null} value the value to get the type of
 * @returns the elementType of the value
 */
const getType = (value) => {
  if (Number.isFinite(value)) return elementTypes.Number
  else if (value === false || value === true) return elementTypes.Boolean
  else if (value === null) return elementTypes.Null
  else if (value === undefined) return elementTypes.Undefined
  return elementTypes.String
}

const castType = (value, type) => {
  switch (type) {
    case elementTypes.Number:
      const num = parseFloat(value)
      return isNaN(num) ? 0 : num
    default:
      return value
  }
}

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
  switch (getType(value)) {
    case elementTypes.Number:
      return button(value.toString(), elementTypes.Number)
    case elementTypes.Boolean:
      return button(value.toString(), elementTypes.Boolean)

    case elementTypes.Null:
      return button("null", elementTypes.Null)
    case elementTypes.Undefined:
      return button("undefined", elementTypes.Undefined)

    default:
      return button(`"${value}"`, elementTypes.String)
  }
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
          setSelected(path)
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

const ElementEditor = ({ path }) => {
  const [state, dispatch] = useContext(Context)
  const type = getType(get(state, path))

  return (
    <div className="ElementEditor">
      <p>
        {path === undefined
          ? "select a value to edit"
          : `editing value (${type}): ${path}`}
      </p>
      <TypedInput
        type={type}
        value={get(state, path)}
        onChange={(event) => {
          dispatch({
            type: "pathSet",
            path,
            val: castType(event.target.value, type),
          })
        }}
      />
    </div>
  )
}

const EditScoutData = () => {
  const [state] = useContext(Context)
  const [selected, setSelected] = useState(undefined)

  // console.log(state)

  const data = useMemo(
    () => objectVisualizer(filterState(state), selected, setSelected),
    [state, selected, setSelected]
  )

  return (
    <>
      <div className="DataEditor">{data}</div>
      <ElementEditor path={selected} />
      <SetPanel wide label="Done" panelName="Review" />
    </>
  )
}

export default EditScoutData
