import SetPanel from "./inputs/SetPanel"
import { Context } from "../state"
import { useContext, useMemo } from "react"
import { filterState } from "../csv"

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
      onClick={fn}
    >{`${label}: ${val}`}</button>
  )

  // this set of code prevents react from messing up our data by assuming we dont wanna render anything
  if (Number.isFinite(value))
    return button(value.toString(), elementTypes.Number)
  else if (value === false || value === true)
    return button(value.toString(), elementTypes.Boolean)
  else if (value === null) return button("null", elementTypes.Null)
  else if (value === undefined)
    return button("undefined!", elementTypes.Undefined)
  return button(`"${value}"`, elementTypes.String)
}

const objectVisualizer = (obj) =>
  Object.entries(obj).map(([key, value]) => {
    if (Object(value) === value) {
      // is an object, we need to go deeper
      return (
        <div className="labelGroup" key={key}>
          <button className="Object label">{`${key}: `}</button>
          {objectVisualizer(value)}
        </div>
      )
    }

    return (
      <DataButton
        key={key}
        label={key}
        value={value}
        disabled={false}
        fn={() => {}}
      />
    )
  })

const EditScoutData = () => {
  const [state, dispatch] = useContext(Context)

  // console.log(state)

  const data = useMemo(() => objectVisualizer(filterState(state)), [state])

  console.log(data)

  return (
    <>
      <div className="DataEditor">{data}</div>
      <SetPanel wide label="Done" panelName="Review" />
    </>
  )
}

export default EditScoutData
