import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./inputs.scss"

const Checkbox = ({ label, prop }) => {
  const [state, dispatch] = useContext(Context)

  const id = `${prop}-checkbox`
  const value = state[prop]

  return <label
    htmlFor={id}
    className="wide Checkbox"
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

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  prop: PropTypes.string.isRequired
}

export default Checkbox