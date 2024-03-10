import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

const Bool = ({ label, trueLabel, prop, onFlip, phase, color, width, height}) => {
  const [state, dispatch] = useContext(Context)

  const current = phase ? (state[state.phase] ?? {})[prop] : state[prop]

  trueLabel = trueLabel ?? `${label}ed`


  const falseColor = color ? color : "green" 
  const trueColor = "less-" + falseColor

  return (
    <button
      className={`${current ? trueColor : falseColor} ${width} ${height}`}
      onClick={() => {
        dispatch({
          type: `set${phase ? "InPhase" : ""}`,
          prop,
          val: !current,
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
  width: PropTypes.string,
  tall: PropTypes.bool,
}

export default Bool
