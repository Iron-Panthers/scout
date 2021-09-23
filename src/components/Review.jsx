import React from "react"

import Checkbox from "./inputs/Checkbox"
import Dropdown from "./inputs/Dropdown"
import Next from "./inputs/Next"
import Numbers from "./inputs/Numbers"


const Review = () => {
  return <>
    <Checkbox
    label="Went under trench" prop="underTrench"></Checkbox>
    <Next></Next>
  </>
}

export default Review