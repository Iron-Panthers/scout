import React from "react"
import Count from "./Count"

const Shoot = () => <>
  <Count phase label="Inner/Outer port" prop="innerOuterSucc"></Count>
  <Count phase label="fail" prop="innerOuterFail"></Count>
  <Count phase label="Lower port" prop="lowerSucc"></Count>
  <Count phase label="fail" prop="innerOuterFail"></Count>
</>

export default Shoot