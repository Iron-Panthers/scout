import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./inputs.scss"

const Numbers = ({ label, prop, idealLength = 4, width, twoLines }) => {
  
  const [state, dispatch] = useContext(Context)
  // const id = `Numbers-${label}-${prop}`.replaceAll(" ", "_")


  const numberMaker = (team) => {
    return <input
              id={team}
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
              value={state[team + prop] ?? ""}
          />

  }  
  const numberInputComponent = <>
    <label htmlFor={"team1"} className={`${twoLines ? "default" : ""}`}>
        {label}
      </label>
      {numberMaker("team1")}
      {numberMaker("team2")}
      {numberMaker("team3")}
      
  </>

  return twoLines ? numberInputComponent : (
    <div className={`Numbers ${ width ? width :"wide"}`}>
     {numberInputComponent}
    </div>
  )
}

Numbers.propTypes = {
  label: PropTypes.string.isRequired,
  prop: PropTypes.string.isRequired,
  idealLength: PropTypes.number,
  width: PropTypes.oneOf(["default, halfWide, Wide"]),
  twoLines: PropTypes.bool,
}

export default Numbers
