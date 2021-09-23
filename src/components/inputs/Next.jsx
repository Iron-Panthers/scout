import React, { useContext } from "react"
import { Context } from "../../state"

import "./inputs.scss"

const Next = ({ wide }) => {
  const [, dispatch] = useContext(Context)

  return <button className={wide ? "wide" : ""} onClick={
    () => {
      dispatch({ type: "next_mode" })
    }
  }>NEXT</button>
}

export default Next