import React, { useContext } from "react"
import { Context } from "../../state"

const Tabs = () => {
  const [state, dispatch] = useContext(Context)

  const TabArray = ["auto", "teleop", "endgame"].map(
    label => <button
      className="Tab"
      disabled={label === state.phase}
      onClick={() => {
        dispatch({ type: "set", prop: "phase", val: label })
      }}
      key={label}
    >{label}</button>
  )

  return <div className="Tabs">{TabArray}</div>
}

export default Tabs