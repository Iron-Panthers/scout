import React from "react"

import { useSettings } from "../state"

import Dropdown from "./inputs/Dropdown"
import Next from "./inputs/Next"
import Numbers from "./inputs/Numbers"
import SetPanel from "./inputs/SetPanel"

import MultiNumber from "./inputs/MultiNumber"


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
       <MultiNumber label = "test" prop = "num" idealLength = {4} width = "halfWide"/>
      <Numbers label="Match #" prop="matchNum" idealLength={2} width = "halfWide"></Numbers>
      <Dropdown
        wide
        prop="matchType"
        options={["Test", "Practice", "Qualification"]}
      ></Dropdown>
      {!isIOS && <SetPanel width = "halfWide" label="Scanner" panelName="Scanner"></SetPanel>}
      <Next width ={isIOS ? "wide" : "halfWide"}></Next>
    </>
  )
}

export default ConfigureQualitative
