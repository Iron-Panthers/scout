import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./buttons.scss"

const Undo = ({ wide }) => {
  const [state, dispatch] = useContext(Context)

  return <button
    className={`${wide ? "wide" : ""} blue`}
    disabled={state.undoStack[state.phase].length === 0}
    onClick={
      () => {
        dispatch({ type: "undo" })
      }
    }
  >UNDO</button>
}

Undo.propTypes = {
  wide: PropTypes.bool
}

export default Undo