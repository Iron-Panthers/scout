import React, { useContext, useRef } from "react"

import { Context } from "../state"
import Dropdown from "./inputs/Dropdown"
import Next from "./inputs/Next"
import Switch from "./inputs/Switch"
import Tabs from "./inputs/Tabs"
import Undo from "./inputs/Undo"
import Info from "./inputs/Info"
import Bool from "./inputs/Bool"

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
             <Grid></Grid>
             <TripleSwitch
              phase
              options={{
                opA: { label: "Dock", prop: "docked", color: "green" },
                opB: { label: "Engage", trueLabel: "Engaged", prop: "engaged", color: "green" },
                opC: { label: "Community", trueLabel: "Community", prop: "community", color: "green" },
              }}
            ></TripleSwitch>
            <Count prop="fail" phase label="Fail" color="green" width = "halfWide"/>
          </>
        )
      case "teleop":
        return (
          <>
           <Grid></Grid>
            <Bool
              prop="defense"
              label="Defense"
              trueLabel="Defended"
              color="green"
              tall={true}
            ></Bool>
            <Count prop="fail" phase label="Fail" color="green" width = "halfWide"/>
          </>
        )
      case "endgame":
        return (
          <>
            <TripleSwitch
              phase
              options={{
                opA: { label: "Dock", prop: "docked", color: "green" },
                opB: { label: "Engage", trueLabel: "Engaged", prop: "engaged", color: "green" },
                opC: { label: "Community", trueLabel: "Community", prop: "community", color: "green" },
              }}
              width = "endgameOptions"
            ></TripleSwitch>
           
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
      {showNext && <Next tall></Next>}
      <Undo wide = {showNext}></Undo>
    </>
  )
}

export default Scout
