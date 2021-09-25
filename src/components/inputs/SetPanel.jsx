import React, { useContext } from "react"
import { Context } from "../../state"

import "./inputs.scss"

const SetPanel = ({ wide, label, panelName }) => {
  const [, dispatch] = useContext(Context)

  return <button className={wide ? "wide" : ""} onClick={
    () => {
      dispatch({ type: "set", prop: "mode", val: panelName })
    }
  }>{label}</button>
}

export default SetPanel