import React, { useContext, useMemo } from "react"
import { Context } from "../../state"

const Dropdown = ({ options, prop, ...props }) => {
  const [state, dispatch] = useContext(Context)
  const optionsElems = useMemo(() => options.map(value => <option value={value} key={value}>{value}</option>), [options])
  return <select
    onChange={event => {
      dispatch({type: "set", prop, val: event.target.value})
    }}
    value={state[prop]}
  >
    {optionsElems}
  </select>
}

export default Dropdown