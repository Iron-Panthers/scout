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

const Button = ({ value, label, type, disabled, fn }) => (
  <button
    key={label}
    className={`${type} label`}
    disabled={disabled}
    onClick={fn}
  >{`${label}: ${value}`}</button>
)

const DataButton = ({ label, value, disabled, fn }) => {
  // this set of code prevents react from messing up our data by assuming we dont wanna render anything
  if (Number.isFinite(value))
    return (
      <Button
        label={label}
        value={value.toString()}
        fn={fn}
        disabled={disabled}
        type={elementTypes.Number}
      />
    )
  else if (value === false || value === true)
    return (
      <Button
        label={label}
        value={value.toString()}
        fn={fn}
        disabled={disabled}
        type={elementTypes.Boolean}
      />
    )
  else if (value === null)
    return (
      <Button
        label={label}
        value={"null"}
        fn={fn}
        disabled={disabled}
        type={elementTypes.Null}
      />
    )
  else if (value === undefined)
    return (
      <Button
        label={label}
        value={"undefined"}
        fn={fn}
        disabled={disabled}
        type={elementTypes.Undefined}
      />
    )
  return (
    <Button
      label={label}
      value={`"${value}"`}
      fn={fn}
      disabled={disabled}
      type={elementTypes.String}
    />
  )
}

const objectVisualizer = (obj) =>
  Object.entries(obj).map(([key, value]) => {
    if (Object(value) === value) {
      // is an object, we need to go deeper
      return (
        <div className="labelGroup">
          <button className="Object label">{`${key}: `}</button>
          {objectVisualizer(value)}
        </div>
      )
    }

    return (
      <DataButton label={key} value={value} disabled={false} fn={() => {}} />
    )
  })

const EditScoutData = () => {
  const [state, dispatch] = useContext(Context)

  console.log(state)

  const data = useMemo(() => objectVisualizer(filterState(state)), [state])

  return (
    <>
      <div className="DataEditor">{data}</div>
      <SetPanel wide label="Done" panelName="Review" />
    </>
  )
}

export default EditScoutData
