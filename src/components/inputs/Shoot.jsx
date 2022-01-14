import React from "react"
import Count from "./Count"

const Shoot = () => (
  <>
    <Count phase label="Upper port" prop="upperSucc" color="green"></Count>
    <Count phase label="fail" prop="upperFail" color="red"></Count>
    <Count phase label="Lower port" prop="lowerSucc" color="green"></Count>
    <Count phase label="fail" prop="lowerFail" color="red"></Count>
  </>
)

export default Shoot
