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

  // it("produces the same object from parseCsvBody as stateToCsv made", () => {
  //   const state = { ...initialState }
  //   // csv is the body of our state, after being cleaned, flattened
  //   const csv = stateToCsv(state)
  //   // parsed data is the object generated from reading that body back into an object after attaching a header
  //   const parsedData = parseCsvBody(csv)

  //   expect(castTypes(parsedData)).toEqual(cleanState(state))
  // })
})

describe("casters", () => {
  describe("castType", () => {
    it(`casts "booleans" to booleans`, () => {
      expect(castType("true")).toBe(true)
      expect(castType("false")).toBe(false)
    })

    it(`casts "ints" to ints`, () => {
      expect(castType("10")).toBe(10)
      expect(castType("1e9")).toBe(1e9)
    })

    it(`leaves strings as they are`, () => {
      expect(castType("ten")).toBe("ten")
      expect(castType("ben10")).toBe("ben10")
      expect(castType("ben, 10?")).toBe("ben, 10?")
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
