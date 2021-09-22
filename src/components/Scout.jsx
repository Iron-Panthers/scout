import React, { useContext } from "react"

import { Context } from "../state" 
import Dropdown from "./inputs/Dropdown"
import Next from "./inputs/Next"
import Numbers from "./inputs/Numbers"


const Scout = () => {

  const [state, dispatch] = useContext(Context)

  return <>
    <div>scout</div>
  </>
}

export default Scout