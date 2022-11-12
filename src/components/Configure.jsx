import React from "react"

import { useSettings } from "../state"

import Dropdown from "./inputs/Dropdown"
import Next from "./inputs/Next"
import Numbers from "./inputs/Numbers"
import SetPanel from "./inputs/SetPanel"
import TextLine from "./inputs/TextLine"

const teamNumberRegex = /^\w*$/

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

  return (
    <>
      <TextLine
        label="Robot Team #"
        prop="team"
        validator={teamNumberRegex}
        explanation="Letters and numbers only"
      ></TextLine>
      <Dropdown
        wide
        prop="matchType"
        options={["Test", "Practice", "Qualification"]}
      ></Dropdown>
      <Numbers label="Match #" prop="matchNum" idealLength={2}></Numbers>
      {!isIOS && <SetPanel label="Scanner" panelName="Scanner"></SetPanel>}
      <Next wide={isIOS}></Next>
    </>
  )
}

export default Configure
