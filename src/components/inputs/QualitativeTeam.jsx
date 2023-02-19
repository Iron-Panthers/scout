import React, { useContext } from "react"
import { Context } from "../../state"
import QualitativeCount from "./QualitativeCount"
import PropTypes from "prop-types"
import "./inputs.scss"

const QualitativeTeam = ({team}) => {
    const [state, dispatch] = useContext(Context)
    // console.log(state[team+"Number"])
    // console.log(team)
  return (
    <div className = "wide qualitativeTeam">
      <QualitativeCount team = {team} prop = "Quickness"/>
      <p>{state[team + "Number"]}</p>
      <QualitativeCount team = {team} prop = "FieldAwareness"/>
    </div>
  )
}

QualitativeCount.propTypes = {
    team: PropTypes.oneOf(["team1", "team2", "team3"]).isRequired
}

export default QualitativeTeam
