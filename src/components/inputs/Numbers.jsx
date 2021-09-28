import React, { useContext } from "react"
import { Context } from "../../state"

import "./inputs.scss"

const Numbers = ({ label, prop, ...props }) => {
  const [state, dispatch] = useContext(Context)
  return <input type="number" pattern="[0-9]*" placeholder={label} autoComplete="off" className="wide"
    onChange={event => {
      dispatch({
        type: "set", prop,
        val: !(event.target.value === undefined || event.target.value === "") ? parseInt(event.target.value) : undefined
      })
    }}
    value={state[prop] ?? ""}
  ></input>
}

export default Numbers