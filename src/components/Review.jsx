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
      <Dropdown
              wide = {false}
              center = {true}
              prop="pickupLocation"
              options={[
                {label: "Ground", value: "Ground"},
                {label: "Single Substation", value: "Single Substation"}, 
                {label: "Double Substation", value: "Double Substation"}
              ]}
        ></Dropdown>
      <Freetext label="Comments?" prop="comments"></Freetext>
      <SetPanel label="Edit Data" panelName="EditScoutData" width = "wide"></SetPanel>
      <Next width = "wide"></Next>
    </>
  )
}

export default Review
