import React from "react"
import Count from "./Count"

const Shoot = () => <>
  <Count phase label="Inner/Outer port" prop="innerOuterSucc" color="green"></Count>
  <Count phase label="fail" prop="innerOuterFail" color="red"></Count>
  <Count phase label="Lower port" prop="lowerSucc" color="green"></Count>
  <Count phase label="fail" prop="lowerFail" color="red"></Count>
</>

export default Shoot