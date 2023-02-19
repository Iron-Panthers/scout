import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./buttons.scss"
import "./inputs.scss"

const QualitativeCount = ({team, prop, width }) => {
  const [state, dispatch] = useContext(Context)

  const handleIncrement = (increment) => {
    dispatch({
        type: `set`,
        prop: team + prop,
        val: state[team + prop] + increment,
      })
  }

  return (
      <div className="qualitativeCounter">
    <button
      className={`${width ?? "default"} green`}
      disabled = {state[team + prop] >= 3}
      onClick={() => handleIncrement(1)}
    >+</button>
    
    <p>{state[team + prop]}</p>
        <button
      className={`${width ?? "default"} red`}
      disabled = {state[team + prop] <= 1}
      onClick={() => handleIncrement(-1)}
    >-</button>
    </div>
  )
}

QualitativeCount.propTypes = {
  team: PropTypes.oneOf(["team1", "team2", "team3"]).isRequired,
  prop: PropTypes.oneOf(["Quickness, FieldAwareness"]).isRequired,
  phase: PropTypes.bool,
  width: PropTypes.oneOf(["default", "halfWide", "wide"])
}

export default QualitativeCount
