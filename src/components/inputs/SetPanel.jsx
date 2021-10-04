import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./inputs.scss"

const SetPanel = ({ wide, label, panelName }) => {
  const [, dispatch] = useContext(Context)

  return <button className={wide ? "wide" : ""} onClick={
    () => {
      dispatch({ type: "set", prop: "mode", val: panelName })
    }
  }>{label}</button>
}

SetPanel.propTypes = {
  wide: PropTypes.bool,
  label: PropTypes.string.isRequired,
  panelName: PropTypes.string.isRequired
}

export default SetPanel