import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./inputs.scss"

const Numbers = ({ label, prop, phase, idealLength = 4, width, twoLines, height }) => {
  
  const [state, dispatch] = useContext(Context)
  const id = `Numbers-${label}-${prop}`.replaceAll(" ", "_")

  const current = phase ? (state[state.phase] ?? {})[prop] : state[prop]

  const numberInputComponent = <>
    <label htmlFor={id} className={`${twoLines ? "default" : ""}`}>
        {label}
      </label>
      <input
        id={id}
        type="number"
        pattern="[0-9]*"
        placeholder={"0".repeat(idealLength)}
        autoComplete="off"
        className={`${width ? width : "wide"}`}
        onChange={(event) => {
          dispatch({
            type: `set${phase ? "InPhase" : ""}`,
            prop,
            track: false,
            val: !(
              event.target.value === undefined || event.target.value === ""
            )
              ? parseInt(event.target.value)
              : undefined,
          })
        }}
        value={current ?? ""}
      />
  </>

  return twoLines ? numberInputComponent : (
    <div className={`Numbers ${ width ? width :"wide"} ${height}`}>
     {numberInputComponent}
    </div>
  )
}

Numbers.propTypes = {
  label: PropTypes.string.isRequired,
  prop: PropTypes.string.isRequired,
  idealLength: PropTypes.number,
  width: PropTypes.string,
  twoLines: PropTypes.bool,
}

export default Numbers
