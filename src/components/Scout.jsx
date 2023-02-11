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
            ></Bool>
            
          </>
        )
      case "endgame":
        return (
          <>
            <Switch
              phase
              options={{
                opA: { label: "Climb", prop: "climb", color: "green" },
                opB: { label: "Fail", prop: "fail", color: "red" },
              }}
            ></Switch>
            <Dropdown
              wide
              phase
              prop="level"
              options={[
                "0 None",
                "1 Low",
                "2 Mid Rung",
                "3 High Rung",
                "4 Traversal Rung",
              ]}
            ></Dropdown>
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
      <Count prop="fail" phase label="Fail" color="green" width = "halfWide"/>
      <Undo wide = {showNext}></Undo>
    </>
  )
}

export default Scout
