import React, { useContext, useMemo } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

const Dropdown = ({prop, phase, wide, options}) => {
  const [state, dispatch] = useContext(Context)
  const optionsElems = useMemo(
    () =>
    options.map((option) => 
        <option value={option.value ? option.value : option.label} key={option.value ? option.value : option.label}>
          {option.label}
        </option>
      ),
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
  options: PropTypes.arrayOf(
    PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string
  })).isRequired,
  prop: PropTypes.string.isRequired,
  phase: PropTypes.bool,
  wide: PropTypes.bool,
}

export default Dropdown
