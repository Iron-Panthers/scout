import React from "react"
import Count from "./Count"



const Grid = () => (
  <div className="grid">
    <Count prop="topCone" phase label="Top Cone" color="yellow"/>
    <Count prop="topCube" phase label="Top Cube" color="purple"/>
    <Count prop="middleCone" phase label="Middle Cone" color="yellow"/>
    <Count prop="middleCube" phase label="Middle Cube" color="purple"/>
    <Count prop="bottomCone" phase label="Bottom Cone" color="yellow"/>
    <Count prop="bottomCube" phase label="Bottom Cube" color="purple"/>
  </div>
)

export default Grid
