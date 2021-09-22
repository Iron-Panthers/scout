import React, { useContext } from "react"

import { Context } from "../state"


const Configure = () => {

  const [ state, dispatch ] = useContext(Context)

  return <div>
    <button onClick={() => {
      console.log(state)
      dispatch({ type: "set_team", val: 10})
    }}>NEXT</button>
  </div>
}

export default Configure