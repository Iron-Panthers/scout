import {
  filterState,
  stateToCsv,
  cleanState,
  parseCsvBody,
  header,
  castType,
  castTypes,
} from "./csv"
import { initialState } from "./reducer"

describe("object parsers and encoders", () => {
  describe("filterState", () => {
    it("matches snapshot for filter on initialState", () => {
      expect(JSON.stringify(filterState(initialState))).toMatchSnapshot()
    })
  })

  describe("cleanState", () => {
    it("matches snapshot for cleanState on initialState", () => {
      expect(JSON.stringify(cleanState(initialState))).toMatchSnapshot()
    })

    const cleanInitialState = cleanState(initialState)

    test.each`
      dirty                                                 | clean
      ${{ ...initialState, version: null }}                 | ${{ ...cleanInitialState, version: null }}
      ${{ ...initialState, version: undefined }}            | ${{ ...cleanInitialState, version: undefined }}
      ${{ ...initialState, bonus: { a: 1, b: null } }}      | ${{ ...cleanInitialState, "bonus-a": 1, "bonus-b": null }}
      ${{ ...initialState, bonus: { a: 1, b: undefined } }} | ${{ ...cleanInitialState, "bonus-a": 1, "bonus-b": undefined }}
    `(
      `cleans objects even if they have undefined or null`,
      ({ dirty, clean }) => {
        expect(cleanState(dirty)).toEqual(clean)
      }
    )
  })

  describe("stateToCsv", () => {
    it("matches snapshot for state to csv on initialState", () => {
      expect(JSON.stringify(stateToCsv(initialState))).toMatchSnapshot()
    })
  })

  describe("header", () => {
    it("matches snapshot for header", () => {
      expect(header).toMatchSnapshot()
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
})

describe("casters", () => {
  describe("castType", () => {
    test.each`
      strBoolean | boolean
      ${"true"}  | ${true}
      ${"false"} | ${false}
    `(`casts "booleans" to booleans`, ({ strBoolean, boolean }) => {
      expect(castType(strBoolean)).toBe(boolean)
    })

    test.each`
      strInt   | int
      ${"10"}  | ${10}
      ${"1e9"} | ${1e9}
    `(`casts "ints" to ints`, ({ strInt, int }) => {
      expect(castType(strInt)).toBe(int)
    })

    test.each`
      str
      ${"ten"}
      ${"ben10"}
      ${"ben, 10?"}
      ${"15 15"}
      ${"10_10"}
      ${"100_000"}
      ${"NaN"}
    `(`leaves strings as they are`, ({ str }) => {
      expect(castType(str)).toBe(str)
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
