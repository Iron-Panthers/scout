import React, { useContext, useRef } from "react"

import { Context } from "../state"
import Next from "./inputs/Next"
import Switch from "./inputs/Switch"
import Tabs from "./inputs/Tabs"
import Undo from "./inputs/Undo"
import Info from "./inputs/Info"
import Bool from "./inputs/Bool"
import Numbers from "./inputs/Numbers"

import Count from "./inputs/Count"

import Grid from "./inputs/Grid"

import "./Scout.scss"
import TripleSwitch from "./inputs/TripleSwitch"

const Scout = () => {
  const [state, dispatch] = useContext(Context)

  const phaseTabContent = (() => {
    switch (state.phase) {
      case "auto":
        return (
          <>
             <Grid width = "wide"></Grid>
             {/* <TripleSwitch
              phase
              options={{
                opA: { label: "Dock", prop: "docked", color: "green" },
                opB: { label: "Engage", trueLabel: "Engaged", prop: "engaged", color: "green" },
                opC: { label: "Community", trueLabel: "Community", prop: "community", color: "green" },
              }}
            ></TripleSwitch> */}
            {/* <Count prop="fail" phase label="Fail" color="green" width = "halfWide"/> */}
          </>
        )
      case "teleop":
        return (
          <>
            <Grid width = "twoThirds"></Grid>
            <Numbers label="Time Left (secs)" idealLength = {2} prop="timeLeft" width = "default" twoLines={true}></Numbers>
            <Bool
              prop="defense"
              label="Defense"
              trueLabel="Defended"
              color="green"
              tall={false}
            ></Bool>
          </>
        )
      // case "endgame":
      //   return (
      //     <>
      //       <TripleSwitch
      //         phase
      //         options={{
      //           opA: { label: "Dock", prop: "docked", color: "green" },
      //           opB: { label: "Engage", trueLabel: "Engaged", prop: "engaged", color: "green" },
      //           opC: { label: "Community", trueLabel: "Community", prop: "community", color: "green" },
      //         }}
      //         width = "endgameOptions"
      //       ></TripleSwitch>
      //      <Numbers label="Time Left (secs)" idealLength = {2} prop="timeLeft" width = "default" twoLines={true}></Numbers>
      //     </>
      //   )
      default:
        return <div>no tab exists.</div>
    }
  })()

  const showNext = state.phase === "teleop"

  return (
    <>
      <div className="scoutHead">
        <Info></Info>
        <Tabs></Tabs>
      </div>
      {phaseTabContent}
      
      <Undo wide = {!showNext}></Undo>
      {showNext && <Next width ="halfWide" typeOfData="Match"></Next>}
    </>
  )
}

export default Scout
