import React from "react"
import Count from "./Count"
import PropTypes from "prop-types"


const Grid = ({width}) => (

  <div className={`grid ${width ? width : "wide"}`}>
    <Count prop="topCone" phase label="Top Cone" color="yellow"/>
    <Count prop="topCube" phase label="Top Cube" color="purple"/>
    <Count prop="middleCone" phase label="Middle Cone" color="yellow"/>
    <Count prop="middleCube" phase label="Middle Cube" color="purple"/>
    <Count prop="bottomCone" phase label="Bottom Cone" color="yellow"/>
    <Count prop="bottomCube" phase label="Bottom Cube" color="purple"/>
  </div>
)

Grid.propTypes = {
  width: PropTypes.oneOf(["default", "halfWide", "twoThirds", "wide"])
}

export default Grid
