import React, { useContext } from "react"
import { useSettings, Context } from "../../state"
import PropTypes from "prop-types"

import "./buttons.scss"
import "./inputs.scss"

const QualitativeCount = ({team, prop1, prop2, phase}) => {
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
    
   return <div className = "qualCounter">

<label className="attribute">{prop === "FieldAwareness" ? "Field Awareness" : prop}</label>
   <button
    className={`green ` + fontSize}
    disabled = {state[team + prop] >= 3}
    onClick={() => handleIncrement(1, prop)}
  >
      +
  </button>
  
  
  <p
  // Read FROM FRICKING PHASE
  >{state[team + prop]}</p>
      <button
        className={`red ` + fontSize}
        disabled = {state[team + prop] <= 1}
        onClick={() => handleIncrement(-1, prop)}
      >-</button>

   </div> 

  }

  return (
      <>
      
        
          {createIncrement(prop1)}

      
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
