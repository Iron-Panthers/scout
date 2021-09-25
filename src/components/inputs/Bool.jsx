import React, { useContext } from "react"
import { Context } from "../../state"

const Bool = ({ label, prop, onFirst, phase, ...props }) => {
  const [state, dispatch] = useContext(Context)

  const current = phase ? (state[state.phase] ?? {})[prop] : state[prop]

  return <button
    onClick={
      () => {
        dispatch({ type: `set${phase ? "InPhase" : ""}`, prop, val: true })
        if (!current && onFirst) onFirst()
      }
    }
  >{`${label}${current ? "ed" : ""}`}</button>
}

export default Bool