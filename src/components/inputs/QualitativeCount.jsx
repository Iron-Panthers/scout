import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./buttons.scss"

const QualitativeCount = ({team, prop, width }) => {
  const [state, dispatch] = useContext(Context)

  const handleIncrement = (increment) => {
    dispatch({
        type: `set`,
        prop,
        val: state[team + prop] + increment,
      })
  }

  return (
      <>
    <button
      className={`${width ?? "default"} green`}
      onClick={() => handleIncrement(1)}
    >+</button>
    <p>{prop === "FieldAwareness" ? "Field Awareness" : prop}</p>
        <button
      className={`${width ?? "default"} red`}
      onClick={() => handleIncrement(-1)}
    >-</button>
    </>
  )
}

QualitativeCount.propTypes = {
  team: PropTypes.oneOf(["team1", "team2", "team3"]).isRequired,
  prop: PropTypes.oneOf(["Quickness, FieldAwareness"]).isRequired,
  phase: PropTypes.bool,
  width: PropTypes.oneOf(["default", "halfWide", "wide"])
}

export default QualitativeCount
