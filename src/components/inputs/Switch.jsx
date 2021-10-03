import React, { useContext } from "react"
import { Context } from "../../state"
import Bool from "./Bool"

const getVal = (option, phase, state) => phase ? (state[state.phase] ?? {})[option.prop] : state[option.prop]

const Switch = ({ options: {
  opA,
  opB
}, onFlip, phase, ...props }) => {
  const [state, dispatch] = useContext(Context)

  // closure abuse for fun and profit
  const onFlipFn = option => undo => {
    // get the current position of the other bool in the switch
    const otherVal = getVal(option, phase, state)
    // if we are undoing the prior, return the other bool to its state at closure time
    dispatch({ type: `set${phase ? "InPhase" : ""}`, prop: option.prop, val: !undo ? false : otherVal, undo: true })
    if (onFlip !== undefined) onFlip(undo)
  }

  return <>
    <Bool {...{
      phase, onFlip: onFlipFn(opB), disabled: getVal(opA, phase, state),...opA
    }}></Bool>
    <Bool {...{
      phase, onFlip: onFlipFn(opA), disabled: getVal(opB, phase, state), ...opB
    }}></Bool>
  </>
}

export default Switch