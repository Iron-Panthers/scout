import React from "react"

import Checkbox from "./inputs/Checkbox"
import Freetext from "./inputs/Freetext"
import Next from "./inputs/Next"
import SetPanel from "./inputs/SetPanel"

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
      <Freetext label="Comments?" prop="comments"></Freetext>
      <SetPanel label="Edit Data" panelName="EditScoutData" width = "wide"></SetPanel>
      <Next width = "wide"></Next>
    </>
  )
}

export default Review
