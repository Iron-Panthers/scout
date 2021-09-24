import React, { useRef, useState } from "react"

import Reset from "./inputs/Reset"
import QrReader from "react-qr-reader"

import xlsx from "xlsx"

import "./Scanner.scss"
import "./inputs/inputs.scss"

const Review = () => {
  const [error, setError] = useState(false)
  const scans = useRef(new Set(JSON.parse(localStorage.scanSet ?? '[]')))
  const [scanCount, setScanCount] = useState(scans.current.size)

  return <>
    <div className="QrWrapper">
      <QrReader
        onScan={val => {
          if (val === null) return
          if (!scans.current.has(val)) {
            scans.current.add(val)
            setScanCount(scanCount + 1)
            localStorage.scanSet = JSON.stringify(Array.from(scans.current))
          }
        }}
        onError={err => {
          console.error(err)
          setError(err)
        }}
      ></QrReader>
    </div>
    <div className="Center">{`Scanned ${scanCount}`}</div>
    {error && <div className="wide Center">{error}</div>}
    <Reset></Reset>
  </>
}

export default Review