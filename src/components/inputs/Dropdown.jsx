import React, { useContext, useMemo } from "react"
import { Context } from "../../state"

const Dropdown = ({ options, stateProp, ...props }) => {
  const [state, dispatch] = useContext(Context)
  const optionsElems = useMemo(() => options.map(value => <option value={value} key={value}>{value}</option>), [options])
  return <select
    onChange={event => {
      dispatch({type: "set", prop: stateProp, val: event.target.value})
    }}
    value={state[stateProp]}
  >
    {optionsElems}
  </select>
}

export default Dropdown