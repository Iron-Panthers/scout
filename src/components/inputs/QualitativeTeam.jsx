import React, { useContext } from "react"
import { Context } from "../../state"
import QualitativeCount from "./QualitativeCount"
import PropTypes from "prop-types"
import "./inputs.scss"

const QualitativeTeam = ({team}) => {
    const [state, dispatch] = useContext(Context)
   
  return (

    <div className = "qualitativeTeam">

        <p id = "teamNumber">{state[team].number}</p>

        <QualitativeCount prop1 = "quickness" prop2 = "fieldAwareness" phase = {team}/>

    </div>
  )
} 

QualitativeCount.propTypes = {
    team: PropTypes.oneOf(["team1", "team2", "team3"]).isRequired
}

export default QualitativeTeam
