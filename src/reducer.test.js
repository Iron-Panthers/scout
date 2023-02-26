import { initialState } from "./reducer.js"

it("has an initial state that matches the snapshot", () => {
  expect(JSON.stringify(initialState)).toMatchSnapshot()
})
