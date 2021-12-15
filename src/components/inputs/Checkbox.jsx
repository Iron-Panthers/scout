import React from "react"
import { useAppState } from "../../state"
import PropTypes from "prop-types"

import "./inputs.scss"

const Checkbox = ({ label, prop, useCtx = useAppState, warn }) => {
  const [state, dispatch] = useCtx()

  const id = `${prop}-checkbox`
  const value = state[prop]

  return (
    <label htmlFor={id} className="wide Checkbox" warn={warn ? 1 : 0}>
      <input
        id={id}
        type="checkbox"
        onChange={() => {
          dispatch({ type: "set", prop, val: !value })
        }}
        checked={value}
      ></input>
      {label}
    </label>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  prop: PropTypes.string.isRequired,
  useCtx: PropTypes.func,
  warn: PropTypes.bool,
}

export default Checkbox
