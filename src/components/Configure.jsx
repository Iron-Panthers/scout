import React, { useContext } from "react"

import { useSettings, Context } from "../state"

import Dropdown from "./inputs/Dropdown"
import Next from "./inputs/Next"
import Numbers from "./inputs/Numbers"
import SetPanel from "./inputs/SetPanel"

const Configure = () => {
  const [settings] = useSettings()
  const isIOS =
    ([
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)) &&
    settings.IOSCheck

    const [state] = useContext(Context)

    const disabledMessage = (() => {
    
      if(!state.team && !state.matchNum) return "Provide a team number and match number"

      if(!state.team) return "Provide a team number"

      if(!state.matchNum) return "Provide a match number"

      return ""
    })()
  return (
    <>
      <Numbers label="Robot Team #" prop="team" width = "halfWide" ></Numbers>
      <Numbers label="Match #" prop="matchNum" idealLength={2} width = "halfWide"></Numbers>
      <Dropdown
        wide
        prop="matchType"
        options={["Practice", "Qualification", "Playoff"]}
      ></Dropdown>
      {!isIOS && <SetPanel width = "halfWide" label="Scanner" panelName="Scanner"></SetPanel>}
      <Next width ={isIOS ? "wide" : "halfWide"} isDisabled = {!(state.team && state.matchNum)} disabledText={disabledMessage}></Next>
    </>
  )
}

export default Configure
