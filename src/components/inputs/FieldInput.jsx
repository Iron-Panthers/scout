import React, { useContext, useRef, useEffect, useState } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./buttons.scss"
import "./inputs.scss"
 
import fullField from "../fullFieldImage2024.png"


/**
 * renderChildren will be passed img data with the following named parameters:
    dimensions {width, height},
    offsets {x, y}
 * Will add more in future if necessary (i'm lazy)
 */
const FieldInput = ({prop, phase, renderChildren, popupInfo}) => {
  const [state, dispatch] = useContext(Context)

  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgHeight, setImgHeight] = useState(0)
  const [imgWidth, setImgWidth] = useState(0)

  const [xOffset, setXOffset] = useState(0)
  const [yOffset, setYOffset] = useState(0)

  const [actionTimeStamp, setActionTimeStamp] = useState(0)

  // Weird updating, BAD
  // Basically, if we check in useeffect that any of these vals are -1, we know user has not actually clicked on it
  // Therefore, don't run the dispatch shot stuff
  const [shotLocation, setShotLocation] = useState({ x: -1, y: -1 })
    
  const [displayPopup, setDisplayPopup] = useState(false)

  const divRef = useRef()
  const imgRef = useRef()

      
  // When any of these changes, offsets should be recalculated
  useEffect(() => {

    if(!imgLoaded) return
    // Bounding rects of div and img
    const divBounds = divRef.current?.getBoundingClientRect()
    const imgBounds = imgRef.current?.getBoundingClientRect()

    // The offset from the left and top should be the img bounds - the div bounds
    setXOffset(imgBounds?.left - divBounds?.left)
    setYOffset(imgBounds?.top - divBounds?.top)

    setImgHeight(imgRef.current?.offsetHeight)
    setImgWidth(imgRef.current?.offsetWidth)

  }, [divRef.current?.getBoundingClientRect(), imgRef.current?.getBoundingClientRect(), imgLoaded])


  useEffect(() => {


    if (shotLocation.x == -1) return

    console.log("x: " + shotLocation.x)
    console.log("y: " + shotLocation.y)
    const currentTime = Date.now()

    // Saving the action's timestamp
    setActionTimeStamp(currentTime - state.startTime)

      
    setDisplayPopup(true)
  }, [shotLocation.x, shotLocation.y])



  const handleClick = (event) => {

    let imgBounds;
      
    if (event.target.alt !== "field") {
        imgBounds = imgRef.current?.getBoundingClientRect()
    } else {
        imgBounds = event.target.getBoundingClientRect()
    }
      
    
    const x = event.clientX - imgBounds.left
    const y = event.clientY - imgBounds.top
    console.log("x: " + x)
    console.log("y: " + y)

    console.log(event.target.alt)
    const percentageX = x / imgWidth
    const percentageY = y / imgHeight
    console.log(imgWidth)

    setShotLocation({ x: percentageX, y: percentageY })
  }

  const spawnDots = () => {

      const currentActions = phase ? (state[state.phase] ?? {})[prop] : state[prop]

      const dots = []

      const height = imgHeight / 14;
      const width = height;

      const displayStyle = displayPopup ? "none" : ""

      for(const actionString of currentActions) {
            const action = JSON.parse(actionString)
         
            const styles = {
                // Subtracting the height and width, so that the centerpoint is at the specified coords
                position: "absolute",
                left: xOffset + action.x * imgWidth - width / 2,
                top: yOffset + action.y * imgHeight - height / 2,
                height: height,
                width: width,
                borderRadius: "50%",
                display: displayStyle,
                backgroundColor: "hsl(354, 100%, 85%, 0.75)",
                textAlign: "center",
              }

          dots.push(<div 
                        style = {styles} 
                        onClick = {e => handleClick(e)}>{action.action}</div>)
          
      }

      return dots


      
  }


  const dispatchShot = (actionType) => {

    setDisplayPopup(false)

    const currentActions = phase ? (state[state.phase] ?? {})[prop] : state[prop]

      const roundedX = Math.round((shotLocation.x + Number.EPSILON) * 10000) / 10000

      const roundedY = Math.round((shotLocation.y + Number.EPSILON) * 10000) / 10000

      const timeInSeconds = actionTimeStamp / 1000
    
      const roundedTime = Math.round((timeInSeconds + Number.EPSILON) * 1000) / 1000
      
    const currentJSON = [
      ...currentActions,
      JSON.stringify({
        x: roundedX,
        y: roundedY,
        action: actionType, 
        time: roundedTime,
      })
    ]
      
    console.log(currentJSON)

    const currentVal = phase ? (state[state.phase] ?? {})[actionType] : state[actionType]


    if(typeof currentVal === "number"){
      dispatch({
        type: `set${phase ? "InPhase" : ""}`,
        prop: [prop, actionType],
        val: [currentJSON, currentVal + 1],
      })
      return;
    }

    if(typeof currentVal === "boolean"){
      dispatch({
        type: `set${phase ? "InPhase" : ""}`,
        prop: [prop, actionType],
        val: [currentJSON, true],
      })
      return;
    }

      
    dispatch({
      type: `set${phase ? "InPhase" : ""}`,
      prop: prop,
      val: currentJSON,
    })
    
  }

  const createPopupButton = (label, actionType, color, styles) => {


      // ik you can do named vars, but like renderpopups is weird
      if(!actionType) {
          actionType = label
      }

      if(!color){
          color = "green"
      }

      const current = phase ? (state[state.phase] ?? {})[actionType] : state[actionType]
    // cursed, basically saying if it's a boolean, then check if it's true in order to see if we should be disabled
    return (
      <button 
        disabled = {current === true}
        onClick={() => dispatchShot(actionType)} className={`${color} popupButton`}
      
      style = {styles}
      >
        {label}
      </button>
    )
  }

const handleClosePopup = () => {
    setDisplayPopup(false)
}

const handleChildren = () => {

    if(!renderChildren) return
  
    return (
        renderChildren({
                dimensions: {
                    width: imgWidth,
                    height: imgHeight,
                },
                offsets: {
                    x: xOffset,
                    y: yOffset,
                },
            })
    )
}

const renderPopups = () => {

    const popups = []


  // Basically, this is kinda cursed
  // But if we detect red
  // We shove teh following popups into different div
  // Then we flexbox the two divs
  // That way we can get better control over the popup widths
  // or we could just have empty....

  
    for(const popup of popupInfo.info){

      if(!popup.dimensions){
        if(popup.defaultDimensions){
          popup.dimensions = {
              width: popup.defaultDimensions.width ,
              height: popup.defaultDimensions.height,
          }
        } else{
          popup.dimensions = {
              width: 3,
              height: 3,
            }
          } 
      }
        
      
      
      const styles = {
        gridColumn: `span ${popup.dimensions.width}`,
        gridRow: `span ${popup.dimensions.height}`,
      }
      

        if(popup.label === "Close"){
            popups.push(
              <button 
                className = "red test "
                onClick ={handleClosePopup}
                style = {styles}
                >Close</button>) 
            continue
        }
        
        popups.push(createPopupButton(popup.label, popup.actionType, popup.color, styles))
    }

  return popups
}

  return (
    <>
    <div 
      className="fiveSixths imageClick veryTall"
      ref={divRef}
      style={displayPopup ? {display: 'none'} : {}}
      >
     
        <img
          src={fullField}
          
          alt="field"
          onClick={(e) => handleClick(e)}
          ref={imgRef}
          onLoad={() => setImgLoaded(true)}          
        />

        {imgLoaded && !displayPopup && spawnDots()}


        {imgLoaded && !displayPopup && handleChildren()}
  

       
        
    </div>
       {displayPopup && renderPopups()}
    </>
  )
}

FieldInput.propTypes = {
  phase: PropTypes.bool,
}

export default FieldInput
