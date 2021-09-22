import React, { useContext } from "react"

import { Context } from "../state"
import Dropdown from "./inputs/Dropdown"
import Next from "./inputs/Next"
import Numbers from "./inputs/Numbers"
import Shoot from "./inputs/Shoot"


const Scout = () => {

  const [state, dispatch] = useContext(Context)

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
          </>
        )
      case "endgame":
        return (
          <>
          </>
        )
      default:
        return <div>no tab exists.</div>
    }
  })()

  return <>{phaseTabContent}</>
}

export default Scout