import React, { useContext } from "react"

import { useSettings, Context } from "../state"

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
 
    const [state] = useContext(Context)

    const compareTwoTeamNums = (team1, team2) => {
      // If one of the teams is left blank, then we shouldn't compare them and we just return true
      // This is because sometimes, a team is missing from the match and don't show up
      if(!team1 || !team2) return true

      // Then actually checking to make sure the two numbers are not equivalent
      if(team1 !== team2) return true

      return false
    }

    // Checks to make sure that at least one of the teams has been actually been filled out
    const teamFilledOut = state.team1Number || state.team2Number || state.team3Number

    // Comparing all the teams
    const teamNumsUnequal = compareTwoTeamNums(state.team1Number,state.team2Number) 
    && compareTwoTeamNums(state.team1Number, state.team3Number) 
    && compareTwoTeamNums(state.team2Number, state.team3Number)

    // Checks if we're ready to move on 
    const ready = state.matchNum && teamFilledOut && teamNumsUnequal

    // Creating the disabled message
    const disabledMessage = (() => {
  
      if(!teamFilledOut && !state.matchNum) return "Provide at least one team number and match number"

      if(!teamFilledOut) return "Provide at least one team number"

      if(!teamNumsUnequal) return "You cannot have multiple of the same team"

      if(state.matchNum == undefined) return "Provide a match number"
      return ""
    })()

  return (
    <>
       <TripleTeamSelector label = "Alliance Teams" prop = "Number" idealLength = {4} width = "halfWide"/>
      <Numbers label="Match #" prop="matchNum" idealLength={2} width = "halfWide"></Numbers>
      <Dropdown
        wide
        prop="matchType"
        options={[
          {label: "Practice", value: "practice"}, 
          {label: "Qualification", value: "qm"}, 
          {label: "Semifinals", value: "sf"}, 
          {label: "Finals", value: "f"}]}
      ></Dropdown>
      {!isIOS && <SetPanel width = "halfWide" label="Scanner" panelName="Scanner"></SetPanel>}
      <Next width ={isIOS ? "wide" : "halfWide"} qualitative isDisabled = {!ready} disabledText= {disabledMessage}></Next>
    </>
  )
}

export default ConfigureQualitative
