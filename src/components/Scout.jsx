import React, { useContext, useRef } from "react"

import { Context } from "../state"
import Next from "./inputs/Next"
import Switch from "./inputs/Switch"
import Tabs from "./inputs/Tabs"
import Undo from "./inputs/Undo"
import Info from "./inputs/Info"
import Bool from "./inputs/Bool"
import Numbers from "./inputs/Numbers"
import Dropdown from "./inputs/Dropdown"

import Count from "./inputs/Count"

import Grid from "./inputs/Grid"

import "./Scout.scss"
import TripleSwitch from "./inputs/TripleSwitch"
import ImageClick from "./inputs/ImageClick"

const Scout = () => {
  const [state, dispatch] = useContext(Context)

  const phaseTabContent = (() => {
    switch (state.phase) {
      case "auto":
        return (
          <>
            <ImageClick full locations phase prop="path"></ImageClick>
          </>
        )
      case "teleop":
        return (
          <>
            {/* <Count prop="scoreSpeaker" phase label="Score Speaker" color="yellow" width={"halfWide"}/>
            <Count prop="scoreAmp" phase label="Score Amp" color="blue" width={"halfWide"}/>
            <Count prop="scoreAmpedSpeaker" phase label="Score AMPED Speaker" color="red" width={"halfWide"}/>
            <Bool prop="shuttlePieces" phase label="Shuttle Pieces" trueLabel = "Shuttled Pieces" color="green"  width={"halfWide"}></Bool>
            <Bool
              prop="defense"
              label="Defense"
              trueLabel="Defended"
              color="green"
              tall={false}
              width={"halfWide"}
            ></Bool> */}

            <ImageClick full prop = "shotData" phase></ImageClick>

          
            
          </>
        )
      case "endgame":
        return (
          <>
           <Bool prop="scoreTrap" phase label="Score Trap" trueLabel = "Scored Trap" color="green" width={"halfWide"}></Bool>
           <Bool prop="harmonize" phase label="Harmonize" trueLabel = "Harmonized" color="green" width={"halfWide"}></Bool>
           <Bool prop="climb" phase label="Climb" trueLabel = "Climbed" color="green" width={"halfWide"}></Bool>
           <Numbers label="Time of start (secs)" idealLength = {2} prop="timeLeft" width = "halfWide" twoLines={false}></Numbers>
           <Undo width = {"halfWide"}></Undo>
          </>
        )
      default:
        return <div>no tab exists.</div>
    }
  })()

  const showNext = state.phase === "endgame"

  return (
    <>
      <div className="scoutHead">
        <Info></Info>
        <Tabs></Tabs>
      </div>
      {phaseTabContent}
      
      {/* <Undo width = {"halfWide"}></Undo> */}


      {showNext && <Next width ="halfWide"></Next>}
      
    </>
  )
}

export default Scout
