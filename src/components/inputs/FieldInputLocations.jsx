import React, { useContext } from "react"
import { Context, useSettings } from "../../state"
import PropTypes from "prop-types"

import FieldInput from "./FieldInput"

import "./buttons.scss"
import "./inputs.scss"

/**
 * renderChildren will be passed img data with the following named parameters:
    dimensions {x, y},
    offsets {x, y}
 * Will add more in future if necessary (i'm lazy)
 */
const FieldImageLocations = ({ prop, phase, locationProp, popupInfo }) => {
  const [state, dispatch] = useContext(Context)
  const [settings, dispatchSettings] = useSettings()

  // First index is label, 2nd index is xPos, 3rd index is yPos
  const locations = [
    ["1", 0.195, 0.15],
    ["2", 0.195, 0.325],
    ["3", 0.195, 0.525],
    ["4", 0.5, 0.1],
    ["5", 0.5, 0.3],
    ["6", 0.5, 0.5],
    ["7", 0.5, 0.7],
    ["8", 0.5, 0.9],
    ["1", 0.815, 0.15],
    ["2", 0.815, 0.325],
    ["3", 0.815, 0.525],
  ]

  const dispatchButtonLocation = (location) => {
    console.log("Disbatched Button Location")

    const current = phase
      ? (state[state.phase] ?? {})[locationProp]
      : state[locationProp]

    dispatch({
      type: `set${phase ? "InPhase" : ""}`,
      prop: locationProp,
      val: [...current, location],
    })
  }

  const renderLocations = ({ dimensions, offsets }) => {
    const currentLocations = phase
      ? (state[state.phase] ?? {})[locationProp]
      : state[locationProp]

    if (!currentLocations || !dimensions || !offsets) return

    const height = dimensions.height / 7
    const width = height

    const children = []
    for (const location of locations) {
      const x = settings.switchScoutingSide ? 1 - location[1] : location[1]
      const y = settings.switchScoutingSide ? 1 - location[2] : location[2]
      const styles = {
        left: offsets.x + dimensions.width * x - width / 2,
        top: offsets.y + dimensions.height * y - height / 2,
        // Might need to fix these two to find if width would ever be limited first (i.e.) half field or smth
        minHeight: height,
        minWidth: width,
      }

      children.push(
        <button
          className={`transparent imageLocation`}
          style={styles}
          disabled={currentLocations.includes(location[0])}
          onClick={() => {
            dispatchButtonLocation(location[0])
          }}
        >{`${location[0]}`}</button>
      )
    }

    return children
  }

  return (
    <FieldInput
      prop={prop}
      phase={phase}
      renderChildren={renderLocations}
      popupInfo={popupInfo}
    />
  )
}

FieldImageLocations.propTypes = {
  phase: PropTypes.bool,
}

export default FieldImageLocations
