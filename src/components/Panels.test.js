import Panels from "./Panels"
import React from "react"
import { screen } from "@testing-library/react"

it("renders without crashing", () => {
  renderContext(<Panels></Panels>)
})

it("advances panel when next is clicked", () => {
  renderContext(<Panels></Panels>)
  expect(screen.getByText("NEXT")).toBeInTheDocument()
  screen.getByText("NEXT").click()
  expect(screen.queryByText("NEXT")).not.toBeInTheDocument()
})
