import Panels from "./Panels"
import React from "react"
import { render, screen } from "@testing-library/react"

it("renders without crashing", () => {
  renderContext(<Panels></Panels>)
})

it("advances panel when next is clicked", () => {
  renderContext(<Panels></Panels>)
  expect(screen.getByText("NEXT")).toBeInTheDocument()
  screen.getByText("NEXT").click()
  expect(screen.getByText("START")).toBeInTheDocument()
})
