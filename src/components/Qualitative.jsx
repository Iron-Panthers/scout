import React, { useContext } from "react"

import { Context } from "../state"

import "./Qualitative.scss"

import Next from "./inputs/Next"
import Info from "./inputs/Info"
import QualitativeTeam from "./inputs/QualitativeTeam"

const Qualitative = () => {

  const [state, dispatch] = useContext(Context)


  
  return (
    <>
      <div className="scoutHead wide">
        <Info></Info>
      </div>

      <div className="third">{state["team2"].number}</div>
      <div className="third">{state["team3"].number}</div>
     
        <QualitativeTeam team = "team1"/>
        

     {/* <Next width ="wide" tall qualitative = {true} isDisabled = {!allDifferentValues} disabledText="All teams must have different value"></Next> */}
     <Next width ="wide" tall qualitative = {true}/>
    </>
  )
}

export default Qualitative
