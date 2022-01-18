import React from "react"

import Checkbox from "./inputs/Checkbox"
import Freetext from "./inputs/Freetext"
import Next from "./inputs/Next"

const Review = () => {
  return (
    <>
      <Checkbox
        label="Shot wrong cargo (with intent to score)"
        prop="wrongCargo"
      ></Checkbox>
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
      <Next wide></Next>
    </>
  )
}

export default Review
