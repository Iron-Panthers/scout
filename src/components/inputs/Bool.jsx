import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

const Bool = ({ label, trueLabel, prop, onFlip, phase, color, wide, tall}) => {
  const [state, dispatch] = useContext(Context)

  const current = phase ? (state[state.phase] ?? {})[prop] : state[prop]
  trueLabel = trueLabel ?? `${label}ed`

  return (
    <button
      className={`${color ?? ""} ${wide ? " wide " : " default "} ${tall ? "tall" : ""}`}
      disabled={current}
      onClick={() => {
        dispatch({
          type: `set${phase ? "InPhase" : ""}`,
          prop,
          val: true,
          prior: onFlip,
        })
      }}
    >
      {current ? trueLabel : label}
    </button>
  )
}

Bool.propTypes = {
  label: PropTypes.string.isRequired,
  trueLabel: PropTypes.string,
  prop: PropTypes.string.isRequired,
  onFlip: PropTypes.func,
  phase: PropTypes.bool,
  color: PropTypes.oneOf(["red", "green", "blue"]),
  wide: PropTypes.bool,
  tall: PropTypes.bool,
}

export default Bool
