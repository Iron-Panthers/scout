import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./inputs.scss"

const Freetext = ({ label, prop }) => {
  const [state, dispatch] = useContext(Context)

  return <textarea type="text" placeholder={label} autoComplete="on" className="wide tall"
    onChange={event => {
      dispatch({
        type: "set", prop,
        val: event.target.value ?? ""
      })
    }}
    value={state[prop] ?? ""}
  ></textarea>
}

Freetext.propTypes = {
  label: PropTypes.string.isRequired,
  prop: PropTypes.string.isRequired
}

export default Freetext