import React, { useContext } from "react"
import { Context } from "../../state"

import "./inputs.scss"
import "./Info.scss"

const Info = () => {
  const [state] = useContext(Context)

  const formattedMultipleTeams = (() => {
    const definedTeams = [
      state.team1.number,
      state.team2.number,
      state.team3.number,
    ].filter((teamNumber) => teamNumber != undefined)

    switch (definedTeams.length) {
      case 0:
        return "Team #????"
      case 1:
        return "Team #" + definedTeams[0]
      case 2:
        return "Teams #" + definedTeams[0] + " and #" + definedTeams[1]
      case 3:
        return (
          "Teams #" +
          definedTeams[0] +
          ", #" +
          definedTeams[1] +
          ", and #" +
          definedTeams[2]
        )
      default:
        console.log("Cry, for you have somehow bypassed my team checking")
    }
  })()

  const teamNum =
    state.mode === "Qualitative"
      ? formattedMultipleTeams
      : "Team #" + state.team

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
