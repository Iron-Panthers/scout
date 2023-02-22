import React, { useContext } from "react"

import { Context } from "../state"

import Next from "./inputs/Next"
import Info from "./inputs/Info"
import QualitativeTeam from "./inputs/QualitativeTeam"

const Qualitative = () => {
  const [state] = useContext(Context)

  const ensureDifferentValues = (team1, team2, team3) => {
    return team1 !== team2 && team1 !== team3 && team2 !== team3
  }

  const allDifferentValues =  ensureDifferentValues(state.team1Quickness, state.team2Quickness, state.team3Quickness) &&
                              ensureDifferentValues(state.team1FieldAwareness, state.team2FieldAwareness, state.team3FieldAwareness)

  return (
    <>
      <div className="scoutHead">
        <Info></Info>
      </div>
      <QualitativeTeam team = "team1"/>
      <QualitativeTeam team = "team2"/>
      <QualitativeTeam team = "team3"/>
     <Next width ="wide" tall qualitative = {true} isDisabled = {!allDifferentValues} disabledText="All teams must have different value"></Next>
    </>
  )
}

export default Qualitative
