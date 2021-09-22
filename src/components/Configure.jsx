import React, { useContext } from "react"

import { Context } from "../state"


const Configure = () => {

  const [ state, dispatch ] = useContext(Context)

  return <div>
    <button onClick={() => {
      console.log(state)
      dispatch({ type: "next_mode"})
    }}>NEXT</button>
  </div>
}

export default Configure