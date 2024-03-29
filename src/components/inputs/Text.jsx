import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./inputs.scss"

const Text = ({ label, prop, idealLength = 4, width, twoLines }) => {
  
  const [state, dispatch] = useContext(Context)
  const id = `Text-${label}-${prop}`.replaceAll(" ", "_")

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
            type: "set",
            prop,
            val: !(
              event.target.value === undefined || event.target.value === ""
            )
              ? parseInt(event.target.value)
              : undefined,
          })
        }}
        value={state[prop] ?? ""}
      />
  </>

  return twoLines ? numberInputComponent : (
    <div className={`Text ${ width ? width :"wide"}`}>
     {numberInputComponent}
    </div>
  )
}

Text.propTypes = {
  label: PropTypes.string.isRequired,
  prop: PropTypes.string.isRequired,
  idealLength: PropTypes.number,
  width: PropTypes.string,
  twoLines: PropTypes.bool,
}

export default Text
