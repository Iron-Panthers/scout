import React, { useContext } from "react"
import { Context } from "../../state"

const Numbers = ({ label, stateProp, ...props }) => {
  const [state, dispatch] = useContext(Context)
  return <input type="number" placeholder={label} autoComplete="off"
    onChange={event => {
      dispatch({
        type: "set", prop: stateProp,
        val: !(event.target.value === undefined || event.target.value === "") ? parseInt(event.target.value) : undefined
      })
      console.log(state, event.target.value)
    }}
    value={state[stateProp] ?? ""}
  ></input>
}

export default Numbers