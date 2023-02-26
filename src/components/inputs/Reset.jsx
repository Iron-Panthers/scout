import React, { useContext, useEffect, useState } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

const Reset = ({ width }) => {
  const [, dispatch] = useContext(Context)
  const [confirm, setConfirm] = useState(false)

  useEffect(() => {
    const timer = confirm
      ? setTimeout(() => setConfirm(false), 5000)
      : undefined
    return () => clearTimeout(timer)
  }, [confirm])

  return (
    <button
      className={`Reset red ${width ? width : "default"}`}
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
  wide: PropTypes.oneOf(["default, halfWide, wide"]),
}

export default Reset
