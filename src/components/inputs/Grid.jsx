import React from "react"
import Count from "./Count"



const Grid = () => (
  <div className="grid">
    <Count prop="topCone" phase label="Top Cone" color="green"/>
    <Count prop="topCube" phase label="Top Cube" color="green"/>
    <Count prop="middleCone" phase label="Middle Cone" color="green"/>
    <Count prop="middleCube" phase label="Middle Cube" color="green"/>
    <Count prop="bottomCone" phase label="Bottom Cone" color="green"/>
    <Count prop="bottomCube" phase label="Bottom Cube" color="green"/>
  </div>
)

export default Grid
