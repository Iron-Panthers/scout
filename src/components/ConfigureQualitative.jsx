import React, { useContext } from "react"

import { useSettings, Context } from "../state"

import Dropdown from "./inputs/Dropdown"
import Next from "./inputs/Next"
import Numbers from "./inputs/Numbers"

import TripleTeamSelector from "./inputs/TripleTeamSelector"
import TextLine from "./inputs/TextLine"

const ConfigureQualitative = () => {
 
  const [state] = useContext(Context)

  const compareTwoTeamNums = (team1, team2) => {
    // If one of the teams is left blank, then we shouldn't compare them and we just return true
    // This is because sometimes, a team is missing from the match and don't show up
    if (!team1 || !team2) return true

    // Then actually checking to make sure the two numbers are not equivalent
    if (team1 !== team2) return true

    return false
  }

  let [team1Num, team2Num, team3Num] = [
    state.team1.number,
    state.team2.number,
    state.team3.number,
  ]

  // Checks to make sure that at least one of the teams has been actually been filled out
  const teamFilledOut = team1Num && team2Num && team3Num

  // Comparing all the teams
  const teamNumsUnequal =
    compareTwoTeamNums(team1Num, team2Num) &&
    compareTwoTeamNums(team1Num, team3Num) &&
    compareTwoTeamNums(team2Num, team3Num)

  // Checks if we're ready to move on
  const ready = state.matchNum && teamFilledOut && teamNumsUnequal && state.scoutName

  // Creating the disabled message
  const disabledMessage = (() => {
    if (!teamFilledOut && !state.matchNum)
      return "Provide all 3 team numbers and a match number"

    if (!teamFilledOut) return "Provide all 3 team numbers"

    if (!teamNumsUnequal) return "You cannot have multiple of the same team"

    if (state.matchNum == undefined) return "Provide a match number"

    if(!state.scoutName) return "Input your name"
    return ""
  })()

  return (
    <>
      <TripleTeamSelector
        label="Alliance Teams"
        prop="number"
        idealLength={4}
        width="halfWide"
        height = "twoHigh"
      />
      <Numbers
        label="Match #"
        prop="matchNum"
        idealLength={2}
        width="halfWide"
      ></Numbers>
      <Dropdown
        width = "halfWide"
        prop="matchType"
        options={[
          { label: "Practice", value: "practice" },
          { label: "Qualification", value: "qm" },
          { label: "Semifinals", value: "sf" },
          { label: "Finals", value: "f" },
        ]}
      ></Dropdown>
      {/* {!isIOS && <SetPanel width = "halfWide" label="Scanner" panelName="Scanner"></SetPanel>} */}

      <TextLine
        width="halfWide"
        label="Scouter Name:"
        explanation="Scouter Name: "
        capitalize={false}
        prop="scoutName"
      />

      <Next
        width="halfWide"
        qualitative
        isDisabled={false && !ready}
        disabledText={disabledMessage}
      ></Next>
    </>
  )
}

export default ConfigureQualitative
