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
        dispatch({ type: `set${phase ? "InPhase" : ""}`, prop: opB.prop, val: false })
        if(onFlip !== undefined) onFlip(undo)
      }, ...opA
    }}></Bool>
    <Bool {...{
      phase, onFlip: undo => {
        dispatch({ type: `set${phase ? "InPhase" : ""}`, prop: opA.prop, val: false })
        if(onFlip !== undefined) onFlip(undo)
      }, ...opB
    }}></Bool>
  </>
}

export default Switch