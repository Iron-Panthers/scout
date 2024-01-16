import { unparse, parse } from "papaparse"
import { initialState } from "./reducer"

/** remove unwanted keys from state */
export const filterState = ({mode, phase, undoStack, ...state }) => {
    // If the phase is auto, then we couldn't have gone into the standard scouting mode
    // Therefore, this is a qualitative scouting form, and the standard scout keys should be filtered out
    return filterCleanedState(state.typeOfData === "Qualitative", state)  
}
 
const filterCleanedState = (isQualitative, {
  // The headers shared between both match and qualitative data
  version,
  matchType,
  matchNum,
  typeOfData,
  // Checking for all the qualitative headers
  // Did it this way, so it's easier to check if all wanted values are here
  team1,
  team2,
  team3,
  
  ...matchState
}) => isQualitative ? {
  version,
  matchType,
  matchNum,
  typeOfData,
  team1, 
  team2,
  team3,
} : {
  version,
  matchType,
  matchNum, 
  typeOfData,
  ...matchState}

/** flattens, cleans a state object such that its keys are hyphen separated of their parents*/
export const cleanState = (rawState) =>
  Object.entries(filterState(rawState)).reduce((obj, [key, val]) => {
    if (typeof val === "object" && val !== null) {
      Object.entries(val).forEach(([key2, val2]) => {
        obj[`${key}-${key2}`] = val2
      })
    } else {
      obj[key] = val
    }
    return obj
  }, {})


/** the fields on a qual state - the flattened keys */
export const qualFields = Object.entries(cleanState({...initialState, typeOfData: "Qualitative"})).map(
  ([key]) => key
)


/** the fields on a match state - the flattened keys */
export const matchFields = Object.entries(cleanState({...initialState, typeOfData: "Match"})).map(
  ([key]) => key
)

// /** the csv header for a match csv ed state */
// export const matchHeader = unparse({...matchFields})

// /** the csv header for a qualitative csv ed state */
// export const qualHeader = unparse({...qualFields})

/** converts state into a csv string */
export const stateToCsv = (state) =>{
  // console.log(state)
  return unparse(
    {
      fields : state.typeOfData === "Qualitative" ? qualFields : matchFields,
      data: Object.entries(cleanState(state)).map(([, val]) => val),
    },
    { header: false }
  )
}

/** converts the body of a csv string into a flattened state object */
export const parseCsvBody = (body) => {

  const header = body.includes("Match") ? [...matchFields] : [...qualFields]

console.log(body)
  const obj = parse(`${header}\r\n${body}`)
  const headArray = obj.data[0]
  const bodyArray = obj.data[1]

  let returnObj = {}

  headArray.forEach((row, i) => {
    const value = bodyArray[i]
    returnObj[row] = value
  })
 
  return returnObj
}

export const castType = (string) => {
  if (isFinite(string) && !isNaN(parseFloat(string)))
    return Number.parseFloat(string)
  if (string === "true") return true
  if (string === "false") return false

  return string
}

/** shallow iteration over an object, to cast types into their respective values if applicable or leave them as strings */
export const castTypes = (object) => {
  return Object.entries(object).reduce((obj, [key, value]) => {
    obj[key] = castType(value)

    return obj
  }, {})
}
