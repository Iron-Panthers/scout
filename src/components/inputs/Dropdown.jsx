import React, { useContext, useMemo } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"
import "./inputs.scss"


const Dropdown = ({prop, phase, width, center, options}) => {
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
      className={(width ? width : " wide ") + (center ? " center-text " : "")}
      onChange={(event) => {

        //console.log("phase:" + phase + " prop:" + prop + " val:" + event.target.value)

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
  width: PropTypes.string,
  center: PropTypes.bool
}

export default Dropdown
