import React, { useContext, useRef } from "react"

import { Context } from "../state"
import Bool from "./inputs/Bool"
import Dropdown from "./inputs/Dropdown"
import Next from "./inputs/Next"
import Shoot from "./inputs/Shoot"
import Tabs from "./inputs/Tabs"
import Timer from "./inputs/Timer"
import Undo from "./inputs/Undo"


const Scout = () => {

  const [state, dispatch] = useContext(Context)
  const time = useRef(150)

  const phaseTabContent = (() => {
    switch (state.phase) {
      case "auto":
        return (
          <>
            <Dropdown wide phase prop="pathType"
              options={[
                "NONE",
                "LINE",
                "SHOOT 3 + LINE",
                "LINE + LOWER 3",
                "STEAL 2",
                "MID BALLS",
                "TRENCH BALLS",
                "OTHER"
              ]}
            ></Dropdown>
            <Shoot></Shoot>
          </>
        )
      case "teleop":
        return (
          <>
            <Shoot></Shoot>
          </>
        )
      case "endgame":
        const storeLevelTime = () => dispatch({ type: "leveled", time: time.current })
        return (
          <>
            <Bool phase label="Climb" prop="climb" color="green"></Bool>
            <Bool phase label="Park" prop="park" color="red"></Bool>
            <Bool phase label="Level" prop="level" onFirst={storeLevelTime} color="green"></Bool>
            <Bool phase label="Not Level" prop="notLevel" onFirst={storeLevelTime} color="red"></Bool>
            <Dropdown wide phase prop="levelQuality" options={[
              "None",
              "Fail",
              "Single Climb",
              "Double Climb",
              "Triple Climb"
            ]}></Dropdown>
          </>
        )
      default:
        return <div>no tab exists.</div>
    }
  })()

  const showNext = state.phase === "endgame"

  return <>
    <Tabs></Tabs>
    {phaseTabContent}
    <Undo wide></Undo>
    <Timer timeRef={time} wide={!showNext}></Timer>
    {showNext && <Next></Next>}
  </>
}

export default Scout