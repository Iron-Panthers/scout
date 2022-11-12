import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./inputs.scss"

const TextLine = ({
  label,
  prop,
  validator,
  explanation,
  capitalize = true,
}) => {
  const [state, dispatch] = useContext(Context)
  const id = `TextLine-${label}-${prop}`.replaceAll(" ", "_")
  return (
    <div className="TextLine">
      <label htmlFor={id} className="AlignRight" title={explanation}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        autoComplete="off"
        className="wide"
        title={explanation}
        onChange={(event) => {
          if (validator === undefined || validator.test(event.target.value)) {
            dispatch({
              type: "set",
              prop,
              val: capitalize
                ? event.target.value.toUpperCase()
                : event.target.value,
            })
          }
        }}
        value={state[prop] ?? ""}
      />
    </div>
  )
}

TextLine.propTypes = {
  label: PropTypes.string.isRequired,
  prop: PropTypes.string.isRequired,
  validator: PropTypes.instanceOf(RegExp),
  explanation: PropTypes.string,
  capitalize: PropTypes.bool,
}

export default TextLine
