import React, { useContext } from "react"
import { Context } from "../../state"

import "./buttons.scss"

const Undo = ({ wide, ...props }) => {
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

export default Undo