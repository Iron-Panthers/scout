import React, { useContext } from "react"
import { Context } from "../../state"

import "./inputs.scss"
import "./Info.scss"
import { format } from "prettier"

const Info = () => {
  const [state] = useContext(Context)

  const formattedMultipleTeams = (() => {  
    const definedTeams = [state.team1Number, state.team2Number, state.team3Number].filter(teamNumber => teamNumber != undefined)
   
    switch(definedTeams.length) {
      case (0) :
        return "team #????"
      case (1) :
        return "team #" + definedTeams[0]
      case (2) :
        return "teams #" + definedTeams [0] + " and #" + definedTeams[1]
      case (3) :
        return "teams #" + definedTeams [0] + ", #" + definedTeams[1] +  ", and #" + definedTeams[2]
      default:
        console.log("Cry, for you have somehow bypassed my team checking")
    }
    
    
  })()

  const teamNum = state.mode === "Qualitative" ? formattedMultipleTeams : "team #" + state.team

  return (
    <div className="Info Center">
      <p>{`${state.matchType.toLowerCase()} #${state.matchNum ?? "??"}`}</p>
      <p>{teamNum}</p>
      {/* <p>{`${state.phase}`}</p> */}
    </div>
  )
}

Info.propTypes = {}

export default Info
