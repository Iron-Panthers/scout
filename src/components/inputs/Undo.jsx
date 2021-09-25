import React, { useContext } from "react"
import { Context } from "../../state"

const Undo = ({ label, prop, wide, ...props }) => {
  const [state, dispatch] = useContext(Context)

  return <button
    className={wide ? "wide" : ""}
    onClick={
      () => {
        dispatch({ type: "undo" })
      }
    }
  >UNDO</button>
}

export default Undo