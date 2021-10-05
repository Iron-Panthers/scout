import App from "./App"
import React from "react"
import { render, screen } from "@testing-library/react"

it("renders without crashing", () => {
  render(<App></App>)
})

it("has panels", () => {
  render(<App></App>)
  expect(screen.getByTestId("panels")).toBeInTheDocument()
})
