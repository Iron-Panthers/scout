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

const labeledElement = (label, element, type, vertical) => {
  return (
    <div
      key={label}
      className={`labeledElement ${type}${vertical ? " vertical" : ""}`}
    >
      <p>{`${label}:`}</p>
      {element}
    </div>
  )
}

const labeledValue = (label, value) => {
  const partialLabeledElement = (val, type) =>
    labeledElement(
      label,
      <p bool-val={type === elementTypes.Boolean ? val : null}>{val}</p>,
      type
    )

  // this set of code prevents react from messing up our data by assuming we dont wanna render anything
  if (Number.isFinite(value))
    return partialLabeledElement(value.toString(), elementTypes.Number)
  else if (value === false || value === true)
    return partialLabeledElement(value.toString(), elementTypes.Boolean)
  else if (value === null)
    return partialLabeledElement("null", elementTypes.Null)
  else if (value === undefined)
    return partialLabeledElement("undefined", elementTypes.Undefined)
  return partialLabeledElement(`"${value}"`, elementTypes.String)
}

const objectVisualizer = (obj) =>
  Object.entries(obj).map(([key, value]) => {
    if (Object(value) === value) {
      // is an object, we need to go deeper
      return labeledElement(
        key,
        objectVisualizer(value),
        elementTypes.Object,
        true
      )
    }

    return labeledValue(key, value)
  })

const EditScoutData = () => {
  const [state, dispatch] = useContext(Context)

  console.log(state)

  const data = useMemo(
    () =>
      objectVisualizer(
        filterState({
          ...state,
          test: { test: 1, t: 2, bl: { a: 1, b: 2, c: 4 } },
        })
      ),
    [state]
  )

  return (
    <>
      <div className="DataEditor">{data}</div>
      <SetPanel wide label="Done" panelName="Review" />
    </>
  )
}

export default EditScoutData
