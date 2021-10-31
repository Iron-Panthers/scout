import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

const Bool = ({ label, prop, onFlip, phase, color, wide }) => {
  const [state, dispatch] = useContext(Context)

  const current = phase ? (state[state.phase] ?? {})[prop] : state[prop]
  const suffix = current
    ? `${label[label.length - 1].toLowerCase() === "e" ? "" : "e"}d`
    : ""

  return (
    <button
      className={`${color ?? ""}${wide ? " wide" : ""}`}
      disabled={current}
      onClick={() => {
        dispatch({
          type: `set${phase ? "InPhase" : ""}`,
          prop,
          val: true,
          prior: onFlip,
        })
      }}
    >{`${label}${suffix}`}</button>
  )
}

Bool.propTypes = {
  label: PropTypes.string.isRequired,
  prop: PropTypes.string.isRequired,
  onFlip: PropTypes.func,
  phase: PropTypes.bool,
  color: PropTypes.oneOf(["red", "green", "blue"]),
  wide: PropTypes.bool,
}

export default Bool
