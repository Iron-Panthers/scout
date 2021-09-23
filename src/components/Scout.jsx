import React, { useContext, useRef } from "react"

import { Context } from "../state"
import Bool from "./inputs/Bool"
import Dropdown from "./inputs/Dropdown"
import Next from "./inputs/Next"
import Shoot from "./inputs/Shoot"
import Tabs from "./inputs/Tabs"
import Timer from "./inputs/Timer"


const Scout = () => {

  const [state, dispatch] = useContext(Context)
  const time = useRef(150)

  const phaseTabContent = (() => {
    switch (state.phase) {
      case "auto":
        return (
          <>
            <Dropdown phase prop="pathType"
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
        const storeLevelTime = () => dispatch({type: "leveled"})
        return (
          <>
          <Dropdown phase prop="levelQuality" options={[
            "None",
            "Fail",
            "Single Climb",
            "Double Climb",
            "Triple Climb"
          ]}></Dropdown>
          <Bool phase label="Climb" prop="climb"></Bool>
          <Bool phase label="Park" prop="park"></Bool>
          <Bool phase label="Level" prop="level" onFirst={storeLevelTime}></Bool>
          <Bool phase label="Not Level" prop="notLevel" onFirst={storeLevelTime}></Bool>
          </>
        )
      default:
        return <div>no tab exists.</div>
    }
  })()

  return <>
  <Tabs></Tabs>
  {phaseTabContent}
  <Timer timeRef={time}></Timer><Next></Next>
  </>
}

export default Scout