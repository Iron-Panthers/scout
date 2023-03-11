import React, { useContext } from "react"

import { Context, useSettings } from "../state"
import { matchFields, qualFields } from "../csv"

import Reset from "./inputs/Reset"

import "./inputs/inputs.scss"

const Export = () => {
  const [, dispatch] = useContext(Context)
  const [settings] = useSettings()

  const matchScans = JSON.parse(localStorage.matchScanSet ?? "[]")
  const qualScans = JSON.parse(localStorage.qualitativeScanSet ?? "[]")


  const downloadCSV = (header, scans, name) => {
    const csv = `${settings.exportWithHeaders ? (header  + "\r\n"): ""}${scans.join("\r\n")}`
    const blob = new Blob([csv], { type: "text/csv" })
    const elem = window.document.createElement("a")
    elem.href = window.URL.createObjectURL(blob)
    elem.download = `${name}_${new Date()
      .toDateString()
      .replaceAll(" ", "_")}_${new Date()
      .toTimeString()
      .replaceAll(" ", "_")}.csv` // filename
    document.body.appendChild(elem)
    elem.click()
    document.body.removeChild(elem)

  }

  return (
    <>
      <div className="Center wide">{`Scanned and Stored ${matchScans.length} match QR code${
        matchScans.length !== 1 ? "s" : ""} and ${qualScans.length} qualitative QR code${
        qualScans.length !== 1 ? "s" : ""}`}
      </div>

      <button
        className="wide"
        disabled={matchScans.length === 0 && qualScans.length === 0}
        onClick={() => {
          // Download match data
          downloadCSV(matchFields, matchScans, "Match")
          // Download qual data
          downloadCSV(qualFields, qualScans, "Qualitative")
        }}
      >
        Export and download as csv
      </button>

      <button
        className="halfWide"
        disabled={matchScans.length === 0 && qualScans.length === 0}
        onClick={() => {
          if (
            window.confirm(
              "Are you very, very sure? All scanned QR code data will be lost forever."
            )
          ) {
            delete localStorage.matchScanSet
            delete localStorage.qualitativeScanSet
            alert("Cleared, resetting app state.")
            dispatch({ type: "reset" })
          } else {
            alert("No data was cleared.")
          }
        }}
      >
        Tap to CLEAR ALL {matchScans.length + qualScans.length} STORED QR CODES PERMANENTLY
      </button>
      <Reset width = "halfWide"></Reset>
    </>
  )
}

export default Export
