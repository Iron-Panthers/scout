import React, { useContext } from "react"
import { Context } from "../../state"

const Next = () => {
  const [state, dispatch] = useContext(Context)

  return <button onClick={
    () => {
      dispatch({ type: "next_mode" })
    }
  }>NEXT</button>
}

export default Next