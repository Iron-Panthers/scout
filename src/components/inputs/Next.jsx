import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./inputs.scss"

const Next = ({ width, tall, qualitative, typeOfData, isDisabled = false, disabledText = "" }) => {
  const [, dispatch] = useContext(Context)

  return (
    <button
      className={`blue ${width ? width : "default"} ${tall ? "tall" : ""}`}
      disabled = {isDisabled}
      onClick={() => {
        dispatch({ type: qualitative ? "next_qualitative_mode" : "next_mode" })
        if(typeOfData) dispatch({typeOfData: typeOfData})
      }}
    >
    <p>{isDisabled ? disabledText : ""}</p>
      NEXT
    </button>
  )
}

Next.propTypes = {
  wide: PropTypes.oneOf(["default", "halfWidth", "wide"]),
  tall:  PropTypes.bool,
  qualitative: PropTypes.bool,
  typeOfData: PropTypes.string,
  isDisabled: PropTypes.bool,
  disabledText: PropTypes.string,
}

export default Next
