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
            <Bool prop="mobility" phase label="Mobility" trueLabel="Mobile" color="green" />
            <Bool prop="docked" phase label="Dock" color="green" />
            <Bool prop="engaged" phase label="Engage" trueLabel="Engaged" color="green" />
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
                opA: { label: "Dock", prop: "dock", color: "green" },
                opB: { label: "Engage", prop: "engage", color: "red" },
                opC: { label: "Community", prop: "community", color: "blue" },
              }}
            ></TripleSwitch>
            <Bool prop="mobility" phase label="Mobility" trueLabel="Mobile" color="green" />
            <Bool prop="docked" phase label="Dock" color="green" />
            <Bool prop="engaged" phase label="Engage" trueLabel="Engaged" color="green" />
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
