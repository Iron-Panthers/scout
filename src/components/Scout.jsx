import React, { useContext, useRef, useEffect, useState } from "react"

import { Context } from "../state"
import Next from "./inputs/Next"
import Switch from "./inputs/Switch"
import Tabs from "./inputs/Tabs"
import Undo from "./inputs/Undo"
import Info from "./inputs/Info"
import Bool from "./inputs/Bool"
import Numbers from "./inputs/Numbers"
import Dropdown from "./inputs/Dropdown"

import "./inputs/inputs.scss"

import Count from "./inputs/Count"

import Grid from "./inputs/Grid"

import "./Scout.scss"
import TripleSwitch from "./inputs/TripleSwitch"

import FieldInput from "./inputs/FieldInput"
import FieldInputLocations from "./inputs/FieldInputLocations"

const Scout = () => {
  const [state, dispatch] = useContext(Context)


  const [currentTime, setCurrentTime] = useState(0)

     
 useEffect(() => {

     dispatch({
         type: `set`,
         prop: "startTime",
         val: Date.now(),
         track: false,
       })
     
     const interval = setInterval(() => {
         setCurrentTime(Date.now())
     }, 500)

     return () => clearInterval(interval);
 }, [])
    
  const phaseTabContent = (() => {
    let popupInfo;
    switch (state.phase) {
      case "auto":

        popupInfo = {
          defaultDimensions: {
            width: 3,
            height: 3,
          },
          info: [
                {
                  label: "Score Speaker",
                  actionType: "scoreSpeaker",
                  color: "green",
                },
                {
                  label: "Score Amp",
                  actionType: "scoreAmp",
                  color: "purple"
                },
                {
                  label: "Mobility",
                  actionType: "mobility",
                  color: "blue",
                },
                {
                  label: "Close",
                  dimensions: {
                    width: 1, 
                    height: 6,
                  }
                },
                {
                  label: "Miss Speaker",
                  actionType: "missSpeaker",
                  color: "less-green",
                },
                {
                  label: "Miss Amp",
                  actionType: "missAmp",
                  color: "less-purple"
                },
                {
                  label: "Dropoff",
                  actionType: "dropoff",
                  color: "yellow"
                },
               ]
        }

       
    
        return (
            
          <>
            {/* <ImageClick full locations phase locationProp = "path" prop = "actions"></ImageClick> */}
              <FieldInputLocations phase prop = "actions" locationProp = "path" popupInfo = {popupInfo}/>
          </>
        )
      case "teleop":


        popupInfo = {
          defaultDimensions: {
            width: 3,
            height: 3,
          },
          info: [
                {
                  label: "Score Speaker",
                  actionType: "scoreSpeaker",
                  color: "green"                  
                },
                {
                  label: "Score Amp",
                  actionType: "scoreAmp",
                  color: "purple"
                },
                {
                  label: "Score Trap",
                  actionType: "scoreTrap",
                  color: "blue"
                },
                {
                  label: "Close",
                  dimensions: {
                    width: 1, 
                    height: 6,
                  }
                },
                {
                  label: "Miss Speaker",
                  actionType: "missSpeaker",
                  color: "less-green"
                },
                {
                  label: "Miss Amp",
                  actionType: "missAmp",
                  color: "less-purple"
                },
                {
                  label: "Shuttle",
                  actionType: "shuttle",
                  color: "less-blue"
                },
               ]
        }

        
        return (
          <>
           <FieldInput phase prop = "actions" popupInfo={popupInfo}></FieldInput>
            {/* <ImageClick full phase prop = "actions"></ImageClick> */}
            
          </>
        )
      case "endgame":
        return (
          <>
           <Bool prop="scoreTrap" phase label="Score Trap" trueLabel = "Scored Trap" color="green" width="fiveTwelfths" height="twoHigh"></Bool>
           <Bool prop="harmonize" phase label="Harmonize" trueLabel = "Harmonized" color="green" width={"fiveTwelfths"} height="twoHigh"></Bool>
              <Bool prop="park" phase label="Park" trueLabel = "Parked" color="green" width={"fiveTwelfths"} height="twoHigh"></Bool>
           <Numbers label="Climb Time of start (secs)" idealLength = {2} prop="climbTimeOfStart" width = "fiveTwelfths" twoLines={false} height = "twoHigh"></Numbers>
           <Undo width = "fiveTwelfths" height = "twoHigh"></Undo>

              <Next width ="fiveTwelfths" height = "twoHigh"></Next>
          </>
        )
      default:
        return <div>no tab exists.</div>
    }
  })()

  const totalNotes = (() => {
    let total = 0;

    total += state.auto.scoreSpeaker
    total += state.auto.scoreAmp

      
    total += state.teleop.scoreSpeaker
    total += state.teleop.scoreAmp
    total += state.teleop.scoreTrap
      
    return total;
  })()

    // Kinda bad, but I don't want to put it in the image click component
    if (state[state.phase]?.prevCycleTimeStamp === 0) {
      dispatch({
        type: `set${state.phase ? "InPhase" : ""}`,
        prop: "prevCycleTimeStamp",
        val: Date.now(),
      })
    }

  //alert(state.teleop.scoreTrap.length)



  // This is also kinda bad

  const roundedTime = (() => {

    const timeInSeconds = (currentTime - state.startTime) / 1000

          const roundTime = Math.round((timeInSeconds + Number.EPSILON) * 100000) / 100000

    if(roundTime < 0) return 0
    
    return Math.trunc(roundTime);
  })()
  

  const displayColor = (() => {
    if(roundedTime <= 15 || state.phase !== "auto") return "";

    return roundedTime % 2 === 0 ? "red" : "yellow"
    
  })()
  return (
    <>
      <div className={`scoutHead quarter`}>
        <Info></Info>
        {/* <Tabs></Tabs> */}
      </div>
      

      <div className={`quarter ${displayColor} display`}
        >{`Current Match Time: ${roundedTime}`}</div>
        <div className="quarter display">{`Total Notes: ${totalNotes}`}</div>
          <Undo width = "quarter"></Undo>

      <Tabs></Tabs> 
      {phaseTabContent}
     
    </>
  )
}

export default Scout
