import React, { useContext, useState } from "react"
import { Context } from "../../state"

const Reset = ({ label, prop, wide, ...props }) => {
  const [state, dispatch] = useContext(Context)
  const [confirm, setConfirm] = useState(false)

  return <button
    className={`Reset ${wide ? "wide" : ""}`}
    onClick={
      () => {
        if (!confirm) {
          setConfirm(true)
        } else {
          dispatch({ type: "reset" })
        }
      }
    }
  >{`Tap to ${confirm ? "Confirm" : "Reset"}`}</button>
}

export default Reset