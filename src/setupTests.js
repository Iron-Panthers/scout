// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import renderer from "react-test-renderer"
import React from "react"
import { Provider } from "./state.jsx"

global.renderContext = (component) => {
  render(<Provider>{component}</Provider>)
}

global.matchesSnapshot = (component) =>
  expect(
    renderer.create(<Provider>{component}</Provider>).toJSON()
  ).toMatchSnapshot()
