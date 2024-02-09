import React, { useContext, useRef, useEffect, useState,} from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"
import ImageLocation from "./ImageLocation"

import "./buttons.scss"
import "./inputs.scss"

import Undo from "./Undo"

import halfField from "../fieldImage2024.png"
import fullField from "../fullFieldImage2024.png"

const ImageClick = ({ prop, phase, full, locations}) => {

  const [state, dispatch] = useContext(Context)

  const current = phase ? (state[state.phase] ?? {})[prop] : state[prop]
  const prevCycleTimeStamp = phase ? (state[state.phase] ?? {})["prevCycleTimeStamp"] : state["prevCycleTimeStamp"]

  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgHeight, setImgHeight] = useState(0)
  const [imgWidth, setImgWidth] = useState(0)

  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);

  
  const [cycleTime, setCycleTime] = useState(0)

  // Weird updating, BAD
  // Basically, if we check in useeffect that any of these vals are -1, we know user has not actually clicked on it
  // Therefore, don't run the dispatch shot stuff
  const [shotLocation, setShotLocation] = useState({x: -1, y: -1})
  const [typeOfShot, setTypeOfShot] = useState("")
  const [displayPopup, setDisplayPopup] = useState(false)
  

  const divRef = useRef();
  const imgRef = useRef();


  // When any of these changes, offsets should be recalculated
  useEffect(() => {
    
    // Bounding rects of div and img
    const divBounds = divRef.current?.getBoundingClientRect();
    const imgBounds = imgRef.current?.getBoundingClientRect();

    // The offset from the left and top should be the img bounds - the div bounds
    setXOffset(imgBounds?.left - divBounds?.left);
    setYOffset(imgBounds?.top - divBounds?.top);

    setImgHeight(imgRef.current?.offsetHeight)
    setImgWidth(imgRef.current?.offsetWidth)
  }, [divRef.current, imgRef.current, imgLoaded]);


  useEffect(() => {

    const currentTime = Date.now()

    if(prevCycleTimeStamp == 0){

      dispatch({
        type: `set${phase ? "InPhase" : ""}`,
        prop: "prevCycleTimeStamp",
        val: currentTime,
      })

    }
   

 
    if(shotLocation.x == -1) return;

    console.log("x: " + shotLocation.x)
    console.log("y: " + shotLocation.y)

   
    setCycleTime(currentTime - prevCycleTimeStamp)    
    setDisplayPopup(true && !locations)
    
  }, [shotLocation.x, shotLocation.y])



  const handleClick = (event) => {

    if(event.target.alt !== "field" && !locations) return;
    const imgBounds = event.target.getBoundingClientRect();
    const x = event.clientX - imgBounds.left;
    const y = event.clientY - imgBounds.top;
    console.log("x: " + x);
    console.log("y: " + y);

    console.log(event.target.alt)
    const percentageX = x / imgWidth;
    const percentageY = y / imgHeight;

    setShotLocation({x: percentageX, y: percentageY})

  }


  const fullImageLocations = () => {
    return(
      <>
         <ImageLocation 
            label = "1"          
            imgDimensions = {{height: imgHeight, width: imgWidth}}  
            offset = {{x: xOffset, y: yOffset}} 
            relativeImgPos = {{x: 0.195, y: 0.15}}
            dispatchButtonLocation = {dispatchButtonLocation}
          />
           <ImageLocation 
            label = "2"          
            imgDimensions = {{height: imgHeight, width: imgWidth}}  
            offset = {{x: xOffset, y: yOffset}} 
            relativeImgPos = {{x: 0.195, y: 0.325}}
            dispatchButtonLocation = {dispatchButtonLocation}
          />
           <ImageLocation 
            label = "3"          
            imgDimensions = {{height: imgHeight, width: imgWidth}}  
            offset = {{x: xOffset, y: yOffset}} 
            relativeImgPos = {{x: 0.195, y: 0.525}}
            dispatchButtonLocation = {dispatchButtonLocation}
          />
           <ImageLocation 
            label = "4"          
            imgDimensions = {{height: imgHeight, width: imgWidth}}  
            offset = {{x: xOffset, y: yOffset}} 
            relativeImgPos = {{x: 0.5, y: 0.1}}
            dispatchButtonLocation = {dispatchButtonLocation}
          />
          <ImageLocation 
            label = "5"          
            imgDimensions = {{height: imgHeight, width: imgWidth}}  
            offset = {{x: xOffset, y: yOffset}} 
            relativeImgPos = {{x: 0.5, y: 0.3}}
            dispatchButtonLocation = {dispatchButtonLocation}
          />
          <ImageLocation 
            label = "6"          
            imgDimensions = {{height: imgHeight, width: imgWidth}}  
            offset = {{x: xOffset, y: yOffset}} 
            relativeImgPos = {{x: 0.5, y: 0.5}}
            dispatchButtonLocation = {dispatchButtonLocation}
          />
          <ImageLocation 
            label = "7"          
            imgDimensions = {{height: imgHeight, width: imgWidth}}  
            offset = {{x: xOffset, y: yOffset}} 
            relativeImgPos = {{x: 0.5, y: 0.7}}
            dispatchButtonLocation = {dispatchButtonLocation}
          />
          <ImageLocation 
            label = "8"          
            imgDimensions = {{height: imgHeight, width: imgWidth}}  
            offset = {{x: xOffset, y: yOffset}} 
            relativeImgPos = {{x: 0.5, y: 0.9}}
            dispatchButtonLocation = {dispatchButtonLocation}
          />
          <ImageLocation 
            label = "1"          
            imgDimensions = {{height: imgHeight, width: imgWidth}}  
            offset = {{x: xOffset, y: yOffset}} 
            relativeImgPos = {{x: 0.815, y: 0.15}}
            dispatchButtonLocation = {dispatchButtonLocation}
          />
          <ImageLocation 
            label = "2"          
            imgDimensions = {{height: imgHeight, width: imgWidth}}  
            offset = {{x: xOffset, y: yOffset}} 
            relativeImgPos = {{x: 0.815, y: 0.325}}
            dispatchButtonLocation = {dispatchButtonLocation}
          />
          <ImageLocation 
            label = "3"          
            imgDimensions = {{height: imgHeight, width: imgWidth}}  
            offset = {{x: xOffset, y: yOffset}} 
            relativeImgPos = {{x: 0.815, y: 0.525}}
            dispatchButtonLocation = {dispatchButtonLocation}
          />
      </>
    )
  }

  const halfImageLocations = () => {
    return (
      <>
        <ImageLocation 
          label = "wooo"          
          imgDimensions = {{height: imgHeight, width: imgWidth}}  
          offset = {{x: xOffset, y: yOffset}} 
          relativeImgPos = {{x: 0.1, y: 0.1}}
          dispatchButtonLocation = {dispatchButtonLocation}
        />
      </>
    )
  }

  const dispatchShot = (shotType) => {

    const currentJSON = [...current, JSON.stringify({
      shotType: shotType, 
      x: shotLocation.x,
      y: shotLocation.y,
      cycleTime: cycleTime,
    })]

    console.log(currentJSON)

    dispatch({
      type: `set${phase ? "InPhase" : ""}`,
      prop,
      val: currentJSON,
    })

    setDisplayPopup(false)
  }

  const dispatchButtonLocation = (location) => {

    const currentJSON = [...current, JSON.stringify({
      shotType: "intakeNote", 
      location: location,
    })]

    console.log(currentJSON)

    dispatch({
      type: `set${phase ? "InPhase" : ""}`,
      prop,
      val: currentJSON,
    })

    //setDisplayPopup(false)
    
  }

  const createPopupButton = (label, value = label) => {

    return <button 
              onClick = {() => dispatchShot(value)}
              className="green popupButton"
            >
              {label}
            </button>
   
  }


  return (
    <>
        <div className="wide imageClick tall" ref = {divRef}>

            {!displayPopup &&
              <img 
                src = {full ? fullField : halfField} 
                alt = "field" 
                onClick = {e => handleClick(e)} ref = {imgRef}
                onLoad={() => setImgLoaded(true)}
              />
            }

            {full && imgLoaded && locations && fullImageLocations()}
            {!full && imgLoaded && locations && halfImageLocations()}
            {displayPopup && !locations && (
              <>
                {createPopupButton("Score Speaker", "scoreSpeaker")}
                {createPopupButton("Score AMPED Speaker", "scoreAmpedSpeaker")}
                {createPopupButton("Miss Speaker", "missSpeaker")}
                <Undo></Undo>
                {createPopupButton("Score Amp", "scoreAmp")}
                {createPopupButton("Miss Amp", "missAmp")}
                {createPopupButton("Score Trap", "scoreTrap")}

                {createPopupButton("Shuttle", "shuttle")}
               
              </>
            )}
            
    </div>
   
    
    </>
  )

}

ImageClick.propTypes = {
  phase: PropTypes.bool,
  full: PropTypes.bool,
}

export default ImageClick
