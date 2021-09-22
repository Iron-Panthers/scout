import React, { useContext } from "react"

import { Context } from "../state"
import Count from "./inputs/Count"
import Next from "./inputs/Next"
import Numbers from "./inputs/Numbers"


const Configure = () => {

  const [ state, dispatch ] = useContext(Context)

  return <div>
    <Numbers label="Robot Team #" stateProp="team"></Numbers>
    <Count label="test label" stateProp="team"></Count>
    <Next></Next>
  </div>
}

export default Configure