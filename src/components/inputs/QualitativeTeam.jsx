import React, { useContext } from "react"
import { Context } from "../../state"
import QualitativeCount from "./QualitativeCount"
import PropTypes from "prop-types"
import "./inputs.scss"
import "./Qualitative.scss"

const QualitativeTeam = ({team}) => {
  const [state, dispatch] = useContext(Context)

  const handleIncrement = (increment, prop) => {
    dispatch({
      type: `setPropInPhase`,
      phase: team,
      prop: prop,
      val: state[team][prop] + increment,
    })
  }


    const createIncrement = (prop) => {
      const current = state[team][prop]

     return (
       <div className = "increment">
         <button
            className={`green `}
            disabled = {current >= 3}
            onClick={() => handleIncrement(1, prop)}
          >+</button>


        <div>{current}</div>

        <button
          className={`red`}
          disabled = {current <= 1}
          onClick={() => handleIncrement(-1, prop)}
        >-</button>

     </div> 
      )}

  
  return (

    <div className="third tall qualTeam">
      <h1>{state[team].number}</h1>
        <h2>Quickness</h2>
          {createIncrement("quickness")}
        <h2>Field Awareness</h2>
          {createIncrement("fieldAwareness")}
    </div>
  )
} 

QualitativeCount.propTypes = {
    team: PropTypes.oneOf(["team1", "team2", "team3"]).isRequired
}

export default QualitativeTeam
