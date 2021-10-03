import React, { useContext } from "react"
import { Context } from "../../state"

const Bool = ({ label, prop, onFlip, phase, color, disabled, ...props }) => {
  const [state, dispatch] = useContext(Context)

  const current = phase ? (state[state.phase] ?? {})[prop] : state[prop]

  return <button
    className={color}
    disabled={disabled}
    onClick={
      () => {
        dispatch({ type: `set${phase ? "InPhase" : ""}`, prop, val: true })
        if(onFlip !== undefined) onFlip()
      }
    }
  >{`${label}${current ? "ed" : ""}`}</button>
}

export default Bool