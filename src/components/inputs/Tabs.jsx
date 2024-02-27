import React, { useContext } from "react"
import { Context } from "../../state"

import "./inputs.scss"
import "./Tabs.scss"

const Tabs = () => {
  const [state, dispatch] = useContext(Context)

  const TabArray = ["auto", "teleop", "endgame"].map((label) => (
    <button
      className="Tab"
      disabled={label === state.phase}
      onClick={() => {
        dispatch({ type: "set_phase", phase: label })
      }}
      key={label}
    >
        <span>{label}</span>
    
    </button>
  ))

  return <div className="Tabs veryTall sixth evenFlex">{TabArray}</div>
}

export default Tabs
