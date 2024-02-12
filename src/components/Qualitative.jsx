import React, { useContext } from "react"

import { Context } from "../state"

import "./Qualitative.scss"

import Next from "./inputs/Next"
import Info from "./inputs/Info"
import QualitativeTeam from "./inputs/QualitativeTeam"

const Qualitative = () => {
  
  return (
    <>
      <div className="scoutHead wide">
        <Info></Info>
      </div>
      <div className = "qualitativeTeamInputs">
        <QualitativeTeam team = "team1"/>
        <QualitativeTeam team = "team2"/>
        <QualitativeTeam team = "team3"/>
      </div>
     {/* <Next width ="wide" tall qualitative = {true} isDisabled = {!allDifferentValues} disabledText="All teams must have different value"></Next> */}
     <Next width ="wide" tall qualitative = {true}/>
    </>
  )
}

export default Qualitative
