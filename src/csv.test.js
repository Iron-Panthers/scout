import {
  filterState,
  stateToCsv,
  cleanState,
  parseCsvBody,
  castType,
  castTypes,
} from "./csv"
import { initialState } from "./reducer"

describe("object parsers and encoders", () => {
  it("matches snapshot for filter on initialState", () => {
    expect(JSON.stringify(filterState(initialState))).toMatchSnapshot()
  })

  it("matches snapshot for cleanState on initialState", () => {
    expect(JSON.stringify(cleanState(initialState))).toMatchSnapshot()
  })

  it("matches snapshot for state to csv on initialState", () => {
    expect(JSON.stringify(stateToCsv(initialState))).toMatchSnapshot()
  })
})

describe("casters", () => {
  describe("castType", () => {
    it(`casts "booleans" to booleans`, () => {
      expect(castType("true")).toBe(true)
      expect(castType("false")).toBe(false)
    })
  })

  describe("castTypes", () => {
    it("produces object with same keys as input with initialState", () => {
      const state = { ...initialState }
      const castedState = castTypes(state)

      expect(Object.keys(state)).toEqual(Object.keys(castedState))
    })
  })
})

// it("produces the same object from parseCsvBody as stateToCsv made", () => {
//   const state = { ...initialState }
//   // csv is the body of our state, after being cleaned, flattened
//   const csv = stateToCsv(state)
//   // parsed data is the object generated from reading that body back into an object after attaching a header
//   const parsedData = parseCsvBody(csv)

//   expect(castTypes(parsedData)).toEqual(cleanState(state))
// })
