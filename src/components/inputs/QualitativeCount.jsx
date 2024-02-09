import React, { useContext } from "react"
import { useSettings, Context } from "../../state"
import PropTypes from "prop-types"

import "./buttons.scss"
import "./inputs.scss"

const QualitativeCount = ({prop1, prop2, phase}) => {
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
        type: `setPropInPhase`,
        phase: phase,
        prop: prop,
        val: state[phase][prop] + increment,
      })
  }

  const createIncrement = (prop) => {
    const current = state[phase][prop]
       
   return <div className = "qualCounter">

<label className="attribute">{prop === "FieldAwareness" ? "Field Awareness" : prop}</label>
   <button
    className={`green ` + fontSize}
    disabled = {current >= 3}
    onClick={() => handleIncrement(1, prop)}
  >
      +
  </button>
  
  
  <p>{current}</p>

      <button
        className={`red ` + fontSize}
        disabled = {current <= 1}
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
  prop: PropTypes.oneOf(["quickness, fieldAwareness"]).isRequired,
  phase: PropTypes.oneOf(["team1", "team2", "team3"]).isRequired,
}

export default QualitativeCount
