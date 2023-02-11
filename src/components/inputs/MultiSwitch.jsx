import React, { useContext } from "react"
import { Context } from "../../state"
import Bool from "./Bool"
import PropTypes from "prop-types"

const getVal = (option, phase, state) =>
  phase ? (state[state.phase] ?? {})[option.prop] : state[option.prop]

const MultiSwitch = ({ options: {opA, opB }, onFlip, phase }) => {
  const [state, dispatch] = useContext(Context)

  // closure abuse for fun and profit
  const onFlipFn = (...options) => (action, undo) => {
    // get the current position of the other bool in the switch

    let anyTrue = false;
    for(const option of options) {
     if (getVal(option, phase, state)) {
       anyTrue = true;
       break;
     }
    } 
    // if we are undoing the prior, return the other bool to its state at closure time
    // a dispatch with fresh state ect is passed in at priortime to prevent a stale fn
    for (const option of options) {
      action({
        type: `set${phase ? "InPhase" : ""}`,
        prop: option.prop,
        val: !undo ? false : anyTrue,
        undo: true,
      })
    }
    // we need to pass in the fresh action/reducer here also
    if (onFlip !== undefined) onFlip(action, undo)
  }

  return (
    <>
      <Bool
        {...{
          ...opA,
          phase,
          onFlip: onFlipFn(opB),
        }}
      ></Bool>
      <Bool
        {...{
          ...opB,
          phase,
          onFlip: onFlipFn(opA),
        }}
      ></Bool>
    </>
  )
}
  
MultiSwitch.propTypes = {
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
    }).isRequired,
  }).isRequired,
  onFlip: PropTypes.func,
  phase: PropTypes.bool,
}

export default MultiSwitch
