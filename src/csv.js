import { unparse, parse } from "papaparse"
import { initialState } from "./reducer"

export const filterState = ({ mode, phase, undoStack, ...state }) => state

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

export const fields = Object.entries(cleanState(initialState)).map(
  ([key]) => key
)

export const header = unparse({ fields })

export const stateToCsv = (state) =>
  unparse(
    {
      fields,
      data: Object.entries(cleanState(state)).map(([, val]) => val),
    },
    { header: false }
  )

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
