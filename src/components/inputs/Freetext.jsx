import React, { useContext } from "react"
import { Context } from "../../state"

import "./inputs.scss"

const Freetext = ({ label, prop, ...props }) => {
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

export default Freetext