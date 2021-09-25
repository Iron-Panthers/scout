import React, { useRef, useState, useContext } from "react"

import { Context } from "../state";

import Reset from "./inputs/Reset"

import "./inputs/inputs.scss"

const Export = () => {
  const [state, dispatch] = useContext(Context)

  const scans = JSON.parse(localStorage.scanSet ?? '[]').map(str => JSON.parse(str))

  return <>
    <div className="Center wide">{`Scanned and Stored ${scans.length} QR${scans.length > 1 ? "s" : ""}`}</div>

    <button className="wide"
      disabled={scans.length === 0}
      onClick={() => {
        console.log('wip')
      }}
    >Export and download as csv</button>

    <button
      disabled={scans.length === 0}
      onClick={() => {
        if (window.confirm("Are you very, very sure? All scanned QR code data will be lost forever.")) {
          delete localStorage.scanSet
          alert("Cleared, resetting app state.")
          dispatch({ type: "reset" })

        } else {
          alert("No data was cleared.")
        }
      }}
    >Tap to CLEAR ALL {scans.length} STORED QR CODES PERMANENTLY</button>
    <Reset></Reset>
  </>
}

export default Export