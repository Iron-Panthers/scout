import React, { useContext, useMemo } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

const Dropdown = ({ options, prop, phase, wide }) => {
  const [state, dispatch] = useContext(Context)
  const optionsElems = useMemo(
    () =>
      options.map((value) => (
        <option value={value} key={value}>
          {value}
        </option>
      )),
    [options]
  )
  return (
    <select
      className={wide ? "wide" : ""}
      onChange={(event) => {
        dispatch({
          type: `set${phase ? "InPhase" : ""}`,
          prop,
          val: event.target.value,
        })
      }}
      value={phase ? state[state.phase][prop] : state[prop]}
    >
      {optionsElems}
    </select>
  )
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  prop: PropTypes.string.isRequired,
  phase: PropTypes.bool,
  wide: PropTypes.bool,
}

export default Dropdown
