import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./inputs.scss"

const SetPanel = ({ width, label, panelName }) => {
  const [, dispatch] = useContext(Context)

  return (
    <button
      className={width ? width : ""}
      onClick={() => {
        dispatch({ type: "set", prop: "mode", val: panelName })
      }}
    >
      {label ?? panelName}
    </button>
  )
}

SetPanel.propTypes = {
  width: PropTypes.oneOf(["default", "halfWide", "wide"]),
  label: PropTypes.string.isRequired,
  panelName: PropTypes.string.isRequired,
}

export default SetPanel
