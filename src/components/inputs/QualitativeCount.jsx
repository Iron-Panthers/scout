import React, { useContext } from "react"
import { useSettings, Context } from "../../state"
import PropTypes from "prop-types"

import "./buttons.scss"
import "./inputs.scss"

const QualitativeCount = ({team, prop1, prop2,}) => {
  const [state, dispatch] = useContext(Context)

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
        type: `set`,
        prop: team + prop,
        val: state[team + prop] + increment,
      })
  }

  const createIncrement = (prop) => {
   return <>
   <button
    className={`green ` + fontSize}
    disabled = {state[team + prop] >= 3}
    onClick={() => handleIncrement(1, prop)}
  >
      +
  </button>
  
  <p>{state[team + prop]}</p>
      <button
        className={`red ` + fontSize}
        disabled = {state[team + prop] <= 1}
        onClick={() => handleIncrement(-1, prop)}
      >-</button>

   </> 

  }

  return (
      <>
          
        <label className="attribute">{prop1 === "FieldAwareness" ? "Field Awareness" : prop1}</label>
        <p className = "spacer"></p>
        <label className="attribute">{prop2 === "FieldAwareness" ? "Field Awareness" : prop2}</label>
        
          {createIncrement(prop1)}
          <p className = "spacer"></p>
          {createIncrement(prop2)}

    </>
  )
}

QualitativeCount.propTypes = {
  team: PropTypes.oneOf(["team1", "team2", "team3"]).isRequired,
  prop: PropTypes.oneOf(["Quickness, FieldAwareness"]).isRequired,
  phase: PropTypes.bool,
}

export default QualitativeCount
