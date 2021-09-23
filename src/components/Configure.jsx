import React from "react"

import Dropdown from "./inputs/Dropdown"
import Next from "./inputs/Next"
import Numbers from "./inputs/Numbers"


const Configure = () => {

  return <>
    <Numbers label="Robot Team #" prop="team"></Numbers>
    <Dropdown prop="matchType"
      options={["Test", "Practice", "Qualification", "Quarterfinal", "Semifinal", "Final"]}
    ></Dropdown>
    <Numbers label="Match #" prop="matchNum"></Numbers>
    <Next></Next>
  </>
}

export default Configure