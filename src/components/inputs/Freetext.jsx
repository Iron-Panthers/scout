import React, { useContext } from "react"
import { Context } from "../../state"

import "./inputs.css"

const Freetext = ({ label, prop, ...props }) => {
  const [state, dispatch] = useContext(Context)

  return <textarea type="text" placeholder={label} autoComplete="on"
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