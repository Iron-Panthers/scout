import React, { useContext } from "react"
import { Context } from "../../state"

const Bool = ({label, prop, phase, ...props}) => {
  const [ state, dispatch ] = useContext(Context)

  const current = phase ? (state[state.phase] ?? {})[prop] : state[prop]

  return <button
  onClick={
    () => {
      dispatch({type: `set${phase ? "InPhase" : ""}`, prop, val: true})
    }
  }
  >{`${label}${current ? "ed" : ""}`}</button>
}

export default Bool