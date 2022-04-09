import SetPanel from "./inputs/SetPanel"
import { Context } from "../state"
import { useContext, useMemo } from "react"

import "./EditScoutData.scss"

const labeledElement = (label, element, vertical) => {
  return (
    <div key={label} className={`labeledElement${vertical ? " vertical" : ""}`}>
      <p>{`${label}:`}</p>
      {element}
    </div>
  )
}

const labeledValue = (label, value) => {
  // this set of code prevents react from messing up our data by assuming we dont wanna render anything
  let string
  if (Number.isFinite(value)) string = value.toString()
  else if (value === false) string = "false"
  else if (value === null) string = "null"
  else if (value === undefined) string = "undefined"
  else string = value

  return labeledElement(label, <p>{string}</p>)
}

const objectVisualizer = (obj) =>
  Object.entries(obj).map(([key, value]) => {
    if (Object(value) === value) {
      // is an object, we need to go deeper
      return labeledElement(key, objectVisualizer(value), true)
    }

    return labeledValue(key, value)
  })

const EditScoutData = () => {
  const [state, dispatch] = useContext(Context)

  console.log(state)

  const data = useMemo(() => objectVisualizer(state), [state])

  return (
    <>
      <div className="DataEditor">{data}</div>
      <SetPanel wide label="Done" panelName="Review" />
    </>
  )
}

export default EditScoutData
