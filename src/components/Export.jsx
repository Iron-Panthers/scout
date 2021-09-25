import React, { useRef, useState, useContext } from "react"

import { Context } from "../state";
import { header } from "../csv";

import Reset from "./inputs/Reset"

import "./inputs/inputs.scss"

const Export = () => {
  const [state, dispatch] = useContext(Context)

  const scans = JSON.parse(localStorage.scanSet ?? '[]')

  return <>
    <div className="Center wide">{`Scanned and Stored ${scans.length} QR${scans.length > 1 ? "s" : ""}`}</div>

    <button className="wide"
      disabled={scans.length === 0}
      onClick={() => {
        const csv = `${header}\r\n${scans.join("\r\n")}`
        const blob = new Blob([csv], {type: 'text/csv'})
        const elem = window.document.createElement('a')
        elem.href = window.URL.createObjectURL(blob)
        elem.download = `Scout_${new Date().toDateString().replaceAll(" ", "_")}_${new Date().toTimeString().replaceAll(" ", "_")}.csv`// filename     
        document.body.appendChild(elem)
        elem.click()        
        document.body.removeChild(elem)
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