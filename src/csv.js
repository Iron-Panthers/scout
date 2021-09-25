import { unparse } from "papaparse"
import { initialState } from "./reducer"

export const cleanState = state => (Object.entries({
  ...state,
  mode: undefined,
  phase: undefined,
}).reduce((obj, [key, val]) => {
  if (typeof val === "object") {
    Object.entries(val).forEach(([key2, val2]) => {
      obj[`${key}-${key2}`] = val2
    })
  } else {
    obj[key] = val
  }
  return obj
}, {}))

export const fields = Object.entries(cleanState(initialState)).map(([key, ]) => key)

// export const header = 