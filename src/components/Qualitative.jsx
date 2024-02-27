import React, { useContext } from "react"

import { Context } from "../state"

import "./Qualitative.scss"

import Next from "./inputs/Next"
import Info from "./inputs/Info"
import QualitativeTeam from "./inputs/QualitativeTeam"
import QualitativeCount from "./inputs/QualitativeCount"

const Qualitative = () => {

  const [state, dispatch] = useContext(Context)

  
  return (
    <>
      <div className="scoutHead wide">
        <Info></Info>
      </div>

      
      <div className="third">
        <h1>{`Team #: ${state["team1"].number}`}</h1>
      </div>

      <div className="third">
        <h1>{`Team #: ${state["team2"].number}`}</h1>
      </div>

      <div className="third">
        <h1>{`Team #: ${state["team3"].number}`}</h1>
      </div>

      
      {/* <div className = "button-container tall">
        <button className = "red">-</button>
      </div>
      <div className = "sixth tall"></div>
      <div className = "button-container tall">
        <button className = "green">+</button>
      </div> */}

      <QualitativeCount label = "Quickness" prop = "quickness" team = "team1" />
      <QualitativeCount label = "Quickness" prop = "quickness" team = "team2" />
      <QualitativeCount label = "Quickness" prop = "quickness" team = "team3" />
      <div className="wide"></div>
      <QualitativeCount label = "Field Awareness" prop = "fieldAwareness" team = "team1" />
      <QualitativeCount label = "Field Awareness" prop = "fieldAwareness" team = "team2" />
      <QualitativeCount label = "Field Awareness" prop = "fieldAwareness" team = "team3" />
{/* 
      <button className = "blue tall"></button>
      <div className = "sixth tall tall"></div>
      <button className = "blue tall"></button>

      <button className = "blue tall"></button>
      <div className = "sixth tall"></div>
      <button className = "blue tall"></button>

      <button className = "green tall"></button>
      <div className = "sixth tall"></div>
      <button className = "green tall"></button>

      <button className = "green tall"></button>
      <div className = "sixth tall"></div>
      <button className = "green tall"></button>

      <button className = "green tall"></button>
      <div className = "sixth tall"></div>
      <button className = "green tall"></button> */}
     
     
        {/* <QualitativeTeam team = "team1"/> */}
        

     {/* <Next width ="wide" tall qualitative = {true} isDisabled = {!allDifferentValues} disabledText="All teams must have different value"></Next> */}
     <Next width ="wide twoHigh" tall qualitative = {true}/>
    </>
  )
}

export default Qualitative
