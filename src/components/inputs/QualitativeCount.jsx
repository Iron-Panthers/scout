import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./buttons.scss"
import "./inputs.scss"

const QualitativeCount = ({team, prop1, prop2, width }) => {
  const [state, dispatch] = useContext(Context)

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
    className={`green`}
    disabled = {state[team + prop] >= 3}
    onClick={() => handleIncrement(1, prop)}
  >
      +
  </button>
  
  <p>{state[team + prop]}</p>
      <button
        className={`${width ?? "default"} red`}
        disabled = {state[team + prop] <= 1}
        onClick={() => handleIncrement(-1, prop)}
      >-</button>

   </> 

  }

  return (
      <>
      
      {/* <div id = "qualitativeCounter" className="qualitativeCounter"> */}
     
        <label className="attribute">{prop1 === "FieldAwareness" ? "Field Awareness" : prop1}</label>
        <p className = "spacer"></p>
        <label className="attribute">{prop2 === "FieldAwareness" ? "Field Awareness" : prop2}</label>
        
          {createIncrement(prop1)}
          <p className = "spacer"></p>
          {createIncrement(prop2)}

      {/* </div> */}
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
