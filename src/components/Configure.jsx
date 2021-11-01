import React from "react"

import { getSettings } from "../settings"

import Dropdown from "./inputs/Dropdown"
import Next from "./inputs/Next"
import Numbers from "./inputs/Numbers"
import SetPanel from "./inputs/SetPanel"

const Configure = () => {
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
    !getSettings().bypassIOSCheck

  return (
    <>
      <Numbers label="Robot Team #" prop="team"></Numbers>
      <Dropdown
        wide
        prop="matchType"
        options={[
          "Test",
          "Practice",
          "Qualification",
          "Quarterfinal",
          "Semifinal",
          "Final",
        ]}
      ></Dropdown>
      <Numbers label="Match #" prop="matchNum" idealLength={2}></Numbers>
      {!isIOS && <SetPanel label="Scanner" panelName="Scanner"></SetPanel>}
      <Next wide={isIOS}></Next>
    </>
  )
}

export default Configure
