import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./buttons.scss"

const PWA = () => {
  const [state, dispatch] = useContext(Context)

  return (
    <button
      className="wide blue"
      onClick={() => {
        // lol
      }}
    >
      Cached
    </button>
  )
}

PWA.propTypes = {}

export default PWA
