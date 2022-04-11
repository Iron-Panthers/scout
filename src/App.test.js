import App from "./App"
import { render, screen } from "@testing-library/react"

it("renders without crashing", () => {
  render(<App></App>)
})

it("has panels", () => {
  render(<App></App>)
  expect(screen.getByTestId("panels")).toBeInTheDocument()
})

it("matches snapshot", () => {
  matchesSnapshot(<App></App>)
})
