import React from "react"
import { useAppState } from "../../state"
import PropTypes from "prop-types"

import "./inputs.scss"

const Checkbox = ({ label, prop, useCtx = useAppState }) => {
  const [state, dispatch] = useCtx()

  const id = `${prop}-checkbox`
  const value = state[prop]

  return (
    <label htmlFor={id} className="wide Checkbox">
      <input
        id={id}
        type="checkbox"
        onClick={(event) => {
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
}

export default Checkbox
