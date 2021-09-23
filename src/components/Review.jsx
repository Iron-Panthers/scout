import React from "react"

import Checkbox from "./inputs/Checkbox"
import Dropdown from "./inputs/Dropdown"
import Next from "./inputs/Next"
import Numbers from "./inputs/Numbers"


const Review = () => {
  return <>
    <Checkbox label="Went under trench" prop="underTrench"></Checkbox>
    <Checkbox label="Player defence" prop="defence"></Checkbox>
    <Checkbox label="Accidents / Problems?" prop="problems"></Checkbox>
    <Next></Next>
  </>
}

export default Review