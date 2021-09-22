import React, { useContext } from "react"

import { Context } from "../state" 
import Dropdown from "./inputs/Dropdown"
import Next from "./inputs/Next"
import Numbers from "./inputs/Numbers"


const Configure = () => {

  const [state, dispatch] = useContext(Context)

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