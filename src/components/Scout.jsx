import React, { useContext, useRef } from "react"

import { Context } from "../state"
import Dropdown from "./inputs/Dropdown"
import Next from "./inputs/Next"
import Shoot from "./inputs/Shoot"
import Switch from "./inputs/Switch"
import Tabs from "./inputs/Tabs"
import Timer from "./inputs/Timer"
import Undo from "./inputs/Undo"
import Info from "./inputs/Info"
import Bool from "./inputs/Bool"
import Count from "./inputs/Count"

import "./Scout.scss"

const Scout = () => {
  const [state, dispatch] = useContext(Context)
  const time = useRef(150)

  const phaseTabContent = (() => {
    switch (state.phase) {
      case "auto":
        return (
          <>
            <Count />
            <Bool />
            <Shoot></Shoot>
          </>
        )
      case "teleop":
        return (
          <>
            <Bool
              prop="underTrench"
              label="Trench Use"
              trueLabel="Used Trench"
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
        const storeLevelTime = (action, undo) => {
          action({ type: "level", time: time.current, undo })
        }
        return (
          <>
            <Switch
              phase
              options={{
                opA: { label: "Climb", prop: "climb", color: "green" },
                opB: { label: "Park", prop: "park", color: "red" },
              }}
            ></Switch>
            <Switch
              phase
              options={{
                opA: { label: "Level", prop: "level", color: "green" },
                opB: { label: "Not Level", prop: "notLevel", color: "red" },
              }}
              onFlip={storeLevelTime}
            ></Switch>
            <Dropdown
              wide
              phase
              prop="levelQuality"
              options={[
                "None",
                "Fail",
                "Single Climb",
                "Double Climb",
                "Triple Climb",
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
      <Undo wide></Undo>
      <Timer timeRef={time} wide={!showNext}></Timer>
      {showNext && <Next></Next>}
    </>
  )
}

export default Scout
