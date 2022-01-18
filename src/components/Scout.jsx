import React, { useContext, useRef } from "react"

import { Context } from "../state"
import Dropdown from "./inputs/Dropdown"
import Next from "./inputs/Next"
import Shoot from "./inputs/Shoot"
import Switch from "./inputs/Switch"
import Tabs from "./inputs/Tabs"
import Undo from "./inputs/Undo"
import Info from "./inputs/Info"
import Bool from "./inputs/Bool"
import Count from "./inputs/Count"

import "./Scout.scss"

const Scout = () => {
  const [state, dispatch] = useContext(Context)

  const phaseTabContent = (() => {
    switch (state.phase) {
      case "auto":
        return (
          <>
            <Count prop="pickup" phase label="Ball Pickup" color="green" />
            <Bool prop="taxi" phase label="Taxi" color="green" />
            <Shoot></Shoot>
          </>
        )
      case "teleop":
        return (
          <>
            <Bool
              prop="wrongCargo"
              label="Shoot Wrong Cargo"
              trueLabel="Shot Wrong Cargo"
              color="green"
            ></Bool>
            <Bool
              prop="defense"
              label="Defense"
              trueLabel="Defended"
              color="green"
            ></Bool>
            <Shoot></Shoot>
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
      {showNext && <Next wide></Next>}
      <Undo wide></Undo>
    </>
  )
}

export default Scout
