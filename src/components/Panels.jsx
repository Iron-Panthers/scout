import React, { useContext } from "react"

import { Context } from "../state"
import Configure from "./Configure"
import Review from "./Review"
import Scout from "./Scout"
import ScanData from "./ScanData"
import Scanner from "./Scanner"

import "./Panels.scss"
import Export from "./Export"
import PWA from "./inputs/PWA"

const Panels = (props) => {
  const [state] = useContext(Context)
  //IIFE for clean code lol
  const panel = (() => {
    switch (state.mode) {
      case "Configure":
        return <Configure></Configure>
      case "Scout":
        return <Scout></Scout>
      case "Review":
        return <Review></Review>
      case "ScanData":
        return <ScanData></ScanData>
      case "Scanner":
        return <Scanner></Scanner>
      case "Export":
        return <Export></Export>
      default:
        return (
          <>
            <div>unspeakable horrors have occurred.</div>
            <div>pray.</div>
          </>
        )
    }
  })()
  return (
    <div className="panel" data-testid="panels">
      <PWA modes={["Configure"]} />
      {panel}
    </div>
  )
}

export default Panels
