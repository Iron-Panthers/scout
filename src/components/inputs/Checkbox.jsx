import React, { useContext } from "react"
import { Context } from "../../state"

import "./inputs.scss"

const Checkbox = ({ label, prop, ...props }) => {
  const [state, dispatch] = useContext(Context)

  const id = `${prop}-checkbox`
  const value = state[prop]

  return <label
    htmlFor={id}
    className="wide"
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