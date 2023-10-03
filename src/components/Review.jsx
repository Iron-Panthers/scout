import React from "react"

import Checkbox from "./inputs/Checkbox"
import Freetext from "./inputs/Freetext"
import Next from "./inputs/Next"
import SetPanel from "./inputs/SetPanel"
import Dropdown from "./inputs/Dropdown"

const Review = () => {
  return (
    <>
      <Checkbox label="Played defense" prop="defense"></Checkbox>
      <Checkbox
        label="Robot had problems / malfunction"
        prop="robotProblems"
      ></Checkbox>
      <Checkbox
        label="Scouting data accidents / problems"
        prop="scoutProblems"
      ></Checkbox>
      <div className="TextLine Divider">Pickup</div>
      <Checkbox
        label="Ground pickup"
        prop="groundPickup"
      ></Checkbox>
      <Checkbox
        label="Single substation pickup"
        prop="singleSubstation"
      ></Checkbox>
      <Checkbox
        label="Double substation pickup"
        prop="doubleSubstation"
      ></Checkbox>
      <Freetext label="Comments?" prop="comments"></Freetext>
      <SetPanel label="Edit Data" panelName="EditScoutData" width = "wide"></SetPanel>
      <Next width = "wide"></Next>
    </>
  )
}

export default Review
