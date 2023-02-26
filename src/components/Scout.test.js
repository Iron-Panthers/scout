import Scout from "./Scout"
import React from "react"
import { screen } from "@testing-library/react"

const tabSeq = ["teleop", "endgame", "auto", "endgame", "teleop", "auto"]
// const tabs = ["auto", "teleop", "endgame"]

it("renders every tab without crashing", () => {
  renderContext(<Scout></Scout>)

  tabSeq.forEach((tab) => {
    expect(screen.getByText(tab)).toBeInTheDocument()
    screen.getByText(tab).click()
  })
})

it("disables tab when clicked", () => {
  renderContext(<Scout></Scout>)

  tabSeq.forEach((tab) => {
    expect(screen.getByText(tab)).not.toBeDisabled()
    screen.getByText(tab).click()
    expect(screen.getByText(tab)).toBeDisabled()
  })
})

it("only renders next button on endgame tab", () => {
  renderContext(<Scout></Scout>)
  ;["auto", "teleop"].forEach((tab) => {
    screen.getByText(tab).click()
    expect(screen.queryByText("NEXT")).toBeNull()
  })
  screen.getByText("endgame").click()
  expect(screen.getByText("NEXT")).toBeInTheDocument()
})

it("counts shots", () => {
  renderContext(<Scout></Scout>)

  for (let i = 0; i < 10; i++) {
    expect(screen.getByText(`Lower hub ${i}`)).toBeInTheDocument()
    screen.getByText(/Lower hub/).click()
  }
})

it("matches snapshot", () => {
  matchesSnapshot(<Scout></Scout>)
})
