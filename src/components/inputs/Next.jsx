import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./inputs.scss"

const Next = ({ width, tall, qualitative }) => {
  const [, dispatch] = useContext(Context)

  return (
    <button
      className={`blue ${width ? width : "default"} ${tall ? "tall" : ""}`}
      onClick={() => {
        dispatch({ type: qualitative ? "next_qualitative_mode" : "next_mode" })
      }}
    >
      NEXT
    </button>
  )
}

Next.propTypes = {
  wide: PropTypes.oneOf(["default, halfWidth, wide"]),
  tall:  PropTypes.bool,
  qualitative: PropTypes.bool
}

export default Next
