import React, { useContext } from "react"
import { Context } from "../../state"

const Count = ({label, prop, phase, ...props}) => {
  const [ state, dispatch ] = useContext(Context)

  const current = phase ? (state[state.phase] ?? {})[prop] : state[prop]

  return <button
  onClick={
    () => {
      dispatch({type: `set${phase ? "InPhase" : ""}`, prop, val: (current ?? 0) + 1})
    }
  }
  >{`${label} ${current}`}</button>
}

export default Count