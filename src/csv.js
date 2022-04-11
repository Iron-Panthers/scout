import { unparse, parse } from "papaparse"
import { initialState } from "./reducer"

/** remove unwanted keys from state */
export const filterState = ({ mode, phase, undoStack, ...state }) => state

/** flattens, cleans a state object such that its keys are hyphen separated of their parents*/
export const cleanState = (rawState) =>
  Object.entries(filterState(rawState)).reduce((obj, [key, val]) => {
    if (typeof val === "object") {
      Object.entries(val).forEach(([key2, val2]) => {
        obj[`${key}-${key2}`] = val2
      })
    } else {
      obj[key] = val
    }
    return obj
  }, {})

/** the fields on a state - the flattened keys */
export const fields = Object.entries(cleanState(initialState)).map(
  ([key]) => key
)

/** the csv header for a csv ed state */
export const header = unparse({ fields })

/** converts state into a csv string */
export const stateToCsv = (state) =>
  unparse(
    {
      fields,
      data: Object.entries(cleanState(state)).map(([, val]) => val),
    },
    { header: false }
  )

/** converts the body of a csv string into a flattened state object */
export const parseCsvBody = (body) => {
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
  if (Number.isFinite(string)) return Number.parseFloat(string)
  if ((string === "true") | (string === "false"))
    return string === "true" ? true : false
  return string
}

/** shallow iteration over an object, to cast types into their respective values if applicable or leave them as strings */
export const castTypes = (object) => {
  return Object.entries(object).reduce((obj, [key, value]) => {
    return (obj[key] = castType(value))
  }, {})
}
