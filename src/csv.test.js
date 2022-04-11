import { filterState } from "./csv"
import { initialState } from "./reducer"

it("matches snapshot for filter on initialState", () => {
  expect(JSON.stringify(filterState(initialState))).toMatchSnapshot()
})
