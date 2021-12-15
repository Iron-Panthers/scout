import React from "react"

import Checkbox from "./inputs/Checkbox"
import Freetext from "./inputs/Freetext"
import Next from "./inputs/Next"

const Review = () => {
  return (
    <>
      <Checkbox label="Went under trench" prop="underTrench"></Checkbox>
      <Checkbox label="Played defense" prop="defense"></Checkbox>
      <Checkbox label="Accidents / Problems?" prop="problems"></Checkbox>
      <Freetext label="Comments?" prop="comments"></Freetext>
      <Next wide></Next>
    </>
  )
}

export default Review
