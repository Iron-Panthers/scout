import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./buttons.scss"

const Count = ({ label, prop, phase, color }) => {
  const [state, dispatch] = useContext(Context)

  const current = phase ? (state[state.phase] ?? {})[prop] : state[prop]

  return (
    <button
      className={color}
      onClick={() => {
        dispatch({
          type: `set${phase ? "InPhase" : ""}`,
          prop,
          val: (current ?? 0) + 1,
        })
      }}
    >{`${label} ${current}`}</button>
  )
}

Count.propTypes = {
  label: PropTypes.string.isRequired,
  prop: PropTypes.string.isRequired,
  phase: PropTypes.bool,
  color: PropTypes.oneOf(["red", "green", "blue"]),
}

export default Count
