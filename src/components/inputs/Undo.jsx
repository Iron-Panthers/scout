import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./buttons.scss"

const Undo = ({ width, height }) => {
  const [state, dispatch] = useContext(Context)

  return (
    <button
      className={`${width} ${height} blue`}
      disabled={state.undoStack[state.phase].length === 0}
      onClick={() => {
        dispatch({ type: "undo" })
      }}
    >
      UNDO
    </button>
  )
}

Undo.propTypes = {
  width: PropTypes.string,
}

export default Undo
