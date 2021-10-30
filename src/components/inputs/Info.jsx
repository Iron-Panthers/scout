import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./inputs.scss"
import "./Info.scss"

const Info = () => {
  const [state] = useContext(Context)

  return (
    <div className="Info Center">
      <p>{`${state.matchType.toLowerCase()} #${state.matchNum ?? "??"}`}</p>
      <p>{`team #${state.team ?? "????"}`}</p>
      {/* <p>{`${state.phase}`}</p> */}
    </div>
  )
}

Info.propTypes = {}

export default Info
