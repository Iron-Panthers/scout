import React, { useContext } from "react"
import { Context } from "../../state"

import "./inputs.scss"
import "./Tabs.scss"

const Tabs = () => {
  const [state, dispatch] = useContext(Context)

  // In general, should be auto, teleop, endgame, but in 2023, endgame wasn't necessary
  const TabArray = ["auto", "teleop"].map((label) => (
    <button
      className="Tab"
      disabled={label === state.phase}
      onClick={() => {
        dispatch({ type: "set_phase", phase: label })
      }}
      key={label}
    >
      {label}
    </button>
  ))

  return <div className="Tabs wide evenFlex">{TabArray}</div>
}

export default Tabs
