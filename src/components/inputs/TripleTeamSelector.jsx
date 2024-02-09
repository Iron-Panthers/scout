import React, { useContext } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"

import "./inputs.scss"

const TripleTeamSelector = ({ label, prop, idealLength = 4, width}) => {
  
  const [state, dispatch] = useContext(Context)
    
  console.log(state)
  const numberMaker = (team) => {

    return <input
              id={team}
              type="number"
              pattern="[0-9]*"
              placeholder={"0".repeat(idealLength)}
              autoComplete="off"
              onChange={(event) => {
              dispatch({
                  type: `setPropInPhase`,
                  phase: team,
                  prop: prop,
                  val: !(
                  event.target.value === undefined || event.target.value === ""
                  )
                  ? parseInt(event.target.value)
                  : undefined,
              })
              }}
              value={state[team][prop] ?? ""}
          />

  }  
  
  return <div className={`TripleTeamSelector ${ width ? width :"wide"}`}>
    <label htmlFor={"team1"}>
        {label}
      </label>
      <div className = "teams">
        {numberMaker("team1")}
        {numberMaker("team2")}
        {numberMaker("team3")}
      </div>
    </div>
  
}

TripleTeamSelector.propTypes = {
  label: PropTypes.string.isRequired,
  prop: PropTypes.string.isRequired,
  phase: PropTypes.bool,
  idealLength: PropTypes.number,
  width: PropTypes.oneOf(["default", "halfWide", "wide"]),
  twoLines: PropTypes.bool,
}

export default TripleTeamSelector
