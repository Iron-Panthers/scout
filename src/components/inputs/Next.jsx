import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./inputs.scss"

const Next = ({ wide }) => {
  const [, dispatch] = useContext(Context)

  return <button className={`blue ${wide ? "wide" : ""}`} onClick={
    () => {
      dispatch({ type: "next_mode" })
    }
  }>NEXT</button>
}

Next.propTypes = {
  wide: PropTypes.bool
}

export default Next