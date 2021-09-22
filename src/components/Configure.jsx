import React, { useContext } from "react"

import { Context } from "../state"
import Count from "./inputs/Count"
import Next from "./inputs/Next"


const Configure = () => {

  const [ state, dispatch ] = useContext(Context)

  return <div>
    <Count label="test label" stateProp="timeLeft"></Count>
    <Next></Next>
  </div>
}

export default Configure