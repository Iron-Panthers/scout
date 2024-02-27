import React, { useContext } from "react"
import { useSettings, Context } from "../../state"
import PropTypes from "prop-types"

import "./buttons.scss"
import "./inputs.scss"

const QualitativeCount = ({team, prop, label}) => {
  const [state, dispatch] = useContext(Context)

  const current = state[team][prop]

  const [settings] = useSettings()

  const isIOS =
    ([
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)) &&
    settings.IOSCheck

  const fontSize = isIOS ? "IOS" : "notIOS";

  const handleIncrement = (increment, prop) => {
    dispatch({
        type: `setPropInPhase`,
        phase: team,
        prop: prop,
        val: state[team][prop] + increment,
      })
  }

  return (
      <>
      
      <div className = "button-container tall">
        <button 
          className = {`red ${fontSize}`} 
          disabled = {current <= 1}
          onClick={() => handleIncrement(-1, prop)}
        >
          
          -</button>
      </div>
      <div className = "sixth twoHigh display-container">
        <h2>{label}</h2>
        <h1>{current}</h1>
      </div>
      <div className = "button-container tall">
        <button 
          className = {`green ${fontSize}`} 
          disabled = {current >= 3}
          onClick={() => handleIncrement(1, prop)}
        >+</button>
      </div>
        

        

    </>
  )
}

QualitativeCount.propTypes = {
  prop: PropTypes.oneOf(["quickness, fieldAwareness"]).isRequired,
  phase: PropTypes.oneOf(["team1", "team2", "team3"]).isRequired,
}

export default QualitativeCount
