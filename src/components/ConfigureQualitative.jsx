import React from "react"

import { useSettings } from "../state"

import Dropdown from "./inputs/Dropdown"
import Next from "./inputs/Next"
import Numbers from "./inputs/Numbers"
import SetPanel from "./inputs/SetPanel"

import TripleTeamSelector from "./inputs/TripleTeamSelector"


const ConfigureQualitative = () => {
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
       <TripleTeamSelector label = "test" prop = "Number" idealLength = {4} width = "halfWide"/>
      <Numbers label="Match #" prop="matchNum" idealLength={2} width = "halfWide"></Numbers>
      <Dropdown
        wide
        prop="matchType"
        options={["Test", "Practice", "Qualification"]}
      ></Dropdown>
      {!isIOS && <SetPanel width = "halfWide" label="Qualitative Scanner" panelName="qualitativeScanner"></SetPanel>}
      <Next width ={isIOS ? "wide" : "halfWide"} qualitative></Next>
    </>
  )
}

export default ConfigureQualitative
