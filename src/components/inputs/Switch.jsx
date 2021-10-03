import React, { useContext } from "react"
import { Context } from "../../state"
import Bool from "./Bool"

const Switch = ({ options: {
  opA,
  opB
}, onFlip, phase, ...props }) => {
  const [state, dispatch] = useContext(Context)

  return <>
    <Bool {...{
      phase, onFlip: undo => {
        const otherVal = phase ? (state[state.phase] ?? {})[opB.prop] : state[opB.prop]
        dispatch({ type: `set${phase ? "InPhase" : ""}`, prop: opB.prop, val: !undo ? false : otherVal, undo: true })
        if (onFlip !== undefined) onFlip(undo)
      }, ...opA
    }}></Bool>
    <Bool {...{
      phase, onFlip: undo => {
        const otherVal = phase ? (state[state.phase] ?? {})[opB.prop] : state[opB.prop]
        dispatch({ type: `set${phase ? "InPhase" : ""}`, prop: opA.prop, val: !undo ? false : otherVal, undo: true })
        if (onFlip !== undefined) onFlip(undo)
      }, ...opB
    }}></Bool>
  </>
}

export default Switch