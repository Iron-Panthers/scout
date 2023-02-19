import React from "react"

import Next from "./inputs/Next"
import Undo from "./inputs/Undo"
import Info from "./inputs/Info"
import QualitativeTeam from "./inputs/QualitativeTeam"

const Qualitative = () => {

  return (
    <>
      <div className="scoutHead">
        <Info></Info>
      </div>
      <QualitativeTeam team = "team1"/>
      <QualitativeTeam team = "team2"/>
      <QualitativeTeam team = "team3"/>
     <Next width ="default" qualitative = {true}></Next>
      <Undo wide = {true}></Undo>
    </>
  )
}

export default Qualitative
