import React, { useContext } from "react"
import { Context } from "../../state"

import "./buttons.scss"

const Count = ({label, prop, phase, color, ...props}) => {
  const [ state, dispatch ] = useContext(Context)

  const current = phase ? (state[state.phase] ?? {})[prop] : state[prop]

  return <button
  className={color}
  onClick={
    () => {
      dispatch({type: `set${phase ? "InPhase" : ""}`, prop, val: (current ?? 0) + 1})
    }
  }
  >{`${label} ${current}`}</button>
}

export default Count