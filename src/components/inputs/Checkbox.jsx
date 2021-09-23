import React, { useContext } from "react"
import { Context } from "../../state"

const Checkbox = ({ label, prop, ...props }) => {
  const [state, dispatch] = useContext(Context)

  const id = `${prop}-checkbox`
  const value = state[prop]

  return <label
    htmlFor={id}
  >
    <input
      id={id}
      type="checkbox"
      onClick={event => {
        dispatch({ type: "set", prop, val: !value })
      }}
      value={value}
    ></input> {label}
  </label>
}

export default Checkbox