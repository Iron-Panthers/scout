import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./inputs.scss"

const Next = ({ width, height, qualitative, isDisabled = false, disabledText = "" }) => {
  const [, dispatch] = useContext(Context)

  return (
    <button
      className={`blue ${width} ${height}`}
      disabled = {isDisabled}
      onClick={() => {
        dispatch({ type: qualitative ? "next_qualitative_mode" : "next_mode" })        
      }}
    >
    {isDisabled && <p>{disabledText}</p>}
      NEXT
    </button>
  )
}

Next.propTypes = {
  wide: PropTypes.oneOf(["default", "halfWidth", "wide"]),
  tall:  PropTypes.bool,
  qualitative: PropTypes.bool,
  isDisabled: PropTypes.bool,
  disabledText: PropTypes.string,
}

export default Next
