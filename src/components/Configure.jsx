import React, { useContext } from "react"

import { Context } from "../state"
import Count from "./inputs/Count"
import Dropdown from "./inputs/Dropdown"
import Next from "./inputs/Next"
import Numbers from "./inputs/Numbers"


const Configure = () => {

  const [state, dispatch] = useContext(Context)

  return <>
    <Numbers label="Robot Team #" stateProp="team"></Numbers>
    <Dropdown stateProp="matchType"
      options={["Test", "Practice", "Qualification", "Quarterfinal", "Semifinal", "Final"]}
    ></Dropdown>
    <Count label="test label" stateProp="team"></Count>
    <Next></Next>
  </>
}

export default Configure