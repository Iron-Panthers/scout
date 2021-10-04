import React, { useContext } from "react"
import { Context } from "../../state"
import Bool from "./Bool"
import PropTypes from "prop-types"

const getVal = (option, phase, state) => phase ? (state[state.phase] ?? {})[option.prop] : state[option.prop]

const Switch = ({ options: {
  opA,
  opB
}, onFlip, phase }) => {
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
      ...opA, phase, onFlip: onFlipFn(opB), disabled: getVal(opA, phase, state)
    }}></Bool>
    <Bool {...{
      ...opB, phase, onFlip: onFlipFn(opA), disabled: getVal(opB, phase, state)
    }}></Bool>
  </>
}

Switch.propTypes = {
  options: PropTypes.shape({
    opA: PropTypes.shape({
      label: PropTypes.string.isRequired,
      prop: PropTypes.string.isRequired,
      color: PropTypes.oneOf(["red", "green", "blue"]),
    }).isRequired,
    opB: PropTypes.shape({
      label: PropTypes.string.isRequired,
      prop: PropTypes.string.isRequired,
      color: PropTypes.oneOf(["red", "green", "blue"]),
    }).isRequired
  }).isRequired,
  onFlip: PropTypes.func,
  phase: PropTypes.bool,
}

export default Switch