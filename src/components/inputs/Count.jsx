import React, { useContext } from "react"
import { Context } from "../../state"

const Count = ({label, prop, ...props}) => {
  const [ state, dispatch ] = useContext(Context)
  return <button
  onClick={
    () => {
      dispatch({type: "set", prop, val: state[prop] ?? 0 + 1})
    }
  }
  >{`${label} ${state[prop]}`}</button>
}

export default Count