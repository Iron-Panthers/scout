import Panels from "./Panels"
import React from "react"
import { screen } from "@testing-library/react"

import { initialState } from "../reducer.js"

describe("panel component", () => {
  it("renders without crashing", () => {
    renderContext(<Panels></Panels>)
  })

  it("advances panel when next is clicked", () => {
    renderContext(<Panels></Panels>)
    expect(screen.getByText("NEXT")).toBeInTheDocument()
    screen.getByText("NEXT").click()
    expect(screen.queryByText("NEXT")).not.toBeInTheDocument()
  })
})

describe("child panels", () => {
  ;[
    "Configure",
    "Scout",
    "Review",
    "EditScoutData",
    "ScanData",
    // "Scanner",
    // scanner cannot be tested because its reader component doesn't play nice with the virtual environment
    "Export",
    "Settings",
  ].forEach((panel) => {
    describe(`${panel} panel`, () => {
      // this will be run for every panel in the array
      it("renders without crashing", () => {
        renderContext(<Panels></Panels>, { ...initialState, mode: panel })
      })
    })
  })
})

it("matches snapshot", () => {
  matchesSnapshot(<Panels></Panels>)
})
