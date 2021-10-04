import React, { useContext, useEffect, useState } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

const Reset = ({ wide }) => {
  const [state, dispatch] = useContext(Context)
  const [confirm, setConfirm] = useState(false)

  useEffect(() => {
    const timer = confirm
      ? setTimeout(() => setConfirm(false), 5000)
      : undefined
    return () => clearTimeout(timer)
  }, [confirm])

  return (
    <button
      className={`Reset red ${wide ? "wide" : ""}`}
      onClick={() => {
        if (!confirm) {
          setConfirm(true)
        } else {
          dispatch({ type: "reset" })
        }
      }}
    >{`Tap${confirm ? " Again " : " "}to ${
      confirm ? "Confirm" : "Reset"
    }`}</button>
  )
}

Reset.propTypes = {
  wide: PropTypes.bool,
}

export default Reset
