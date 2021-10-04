import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

const Bool = ({ label, prop, onFlip, phase, color, disabled }) => {
  const [state, dispatch] = useContext(Context)

  const current = phase ? (state[state.phase] ?? {})[prop] : state[prop]

  return <button
    className={color}
    disabled={disabled}
    onClick={
      () => {
        dispatch({ type: `set${phase ? "InPhase" : ""}`, prop, val: true, prior: onFlip })
      }
    }
  >{`${label}${current ? "ed" : ""}`}</button>
}

Bool.propTypes = {
  label: PropTypes.string.isRequired,
  prop: PropTypes.string.isRequired,
  onFlip: PropTypes.func,
  phase: PropTypes.bool,
  color: PropTypes.oneOf(["red", "green", "blue"]),
  disabled: PropTypes.bool,
}

export default Bool