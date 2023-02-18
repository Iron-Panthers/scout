import React, { useContext, useRef } from "react"

import { Context } from "../state"
import Next from "./inputs/Next"
import Tabs from "./inputs/Tabs"
import Undo from "./inputs/Undo"
import Info from "./inputs/Info"
import Bool from "./inputs/Bool"
import Numbers from "./inputs/Numbers"

import Count from "./inputs/Count"

import Grid from "./inputs/Grid"

import "./Scout.scss"
import TripleSwitch from "./inputs/TripleSwitch"

const Qualitative = () => {
  const [state, dispatch] = useContext(Context)


  return (
    <>
      <div className="scoutHead">
        <Info></Info>
        <Tabs></Tabs>
      </div>
      <div>hello</div>
     
     <Next width ="default"></Next>
      <Undo wide = {true}></Undo>
    </>
  )
}

export default Qualitative
