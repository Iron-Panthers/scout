import React from "react"

import Dropdown from "./inputs/Dropdown"
import Next from "./inputs/Next"
import Numbers from "./inputs/Numbers"
import SetPanel from "./inputs/SetPanel"


const Configure = () => {

  return <>
    <Numbers label="Robot Team #" prop="team"></Numbers>
    <Dropdown wide prop="matchType"
      options={["Test", "Practice", "Qualification", "Quarterfinal", "Semifinal", "Final"]}
    ></Dropdown>
    <Numbers label="Match #" prop="matchNum"></Numbers>
    <SetPanel label="Scanner" panelName="Scanner"></SetPanel><Next></Next>
  </>
}

export default Configure