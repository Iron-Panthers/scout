import React, { useContext } from "react"
import { Context } from "../../state"
import Bool from "./Bool"

const Switch = ({ options: {
  opA,
  opB
}, onFlip, phase, ...props }) => {
  const [state, dispatch] = useContext(Context)

  // const current = phase ? (state[state.phase] ?? {})[prop] : state[prop]

  // return <button
  //   className={color}
  //   onClick={
  //     () => {
  //       dispatch({ type: `set${phase ? "InPhase" : ""}`, prop, val: true })
  //       if (!current && onFirst) onFirst()
  //     }
  //   }
  // >{`${label}${current ? "ed" : ""}`}</button>

  return <>
    <Bool {...{ phase, onFlip, ...opA }}></Bool>
    <Bool {...{ phase, onFlip, ...opB }}></Bool>
  </>
}

export default Switch