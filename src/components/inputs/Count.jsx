import React, { useContext } from "react"
import { Context } from "../../state"

const Count = ({label, stateProp, ...props}) => {
  const [ state, dispatch ] = useContext(Context)
  return <button
  onClick={
    () => {
      dispatch({type: "set", prop: stateProp, val: state[stateProp] + 1})
    }
  }
  >{`${label} ${state[stateProp]}`}</button>
}

export default Count