import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./inputs.scss"

const Numbers = ({ label, prop, idealLength = 4 }) => {
  const [state, dispatch] = useContext(Context)
  const id = `Numbers-${label}-${prop}`.replaceAll(" ", "_")
  return (
    <div className="Numbers">
      <label htmlFor={id} className="AlignRight">
        {label}
      </label>
      <input
        id={id}
        type="number"
        pattern="[0-9]*"
        placeholder={"0".repeat(idealLength)}
        autoComplete="off"
        className="wide"
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
    </div>
  )
}

Numbers.propTypes = {
  label: PropTypes.string.isRequired,
  prop: PropTypes.string.isRequired,
  idealLength: PropTypes.number,
}

export default Numbers
