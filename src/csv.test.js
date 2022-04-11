import { filterState, stateToCsv } from "./csv"
import { initialState } from "./reducer"

it("matches snapshot for filter on initialState", () => {
  expect(JSON.stringify(filterState(initialState))).toMatchSnapshot()
})

it("matches snapshot for state to csv on initialState", () => {
  expect(JSON.stringify(stateToCsv(initialState))).toMatchSnapshot()
})
