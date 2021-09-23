import React, { useState } from "react"

import Reset from "./inputs/Reset"
import QrReader from "react-qr-reader"

import "./Scanner.scss"
import "./inputs/inputs.scss"

const Review = () => {
  const [error, setError] = useState(false)


  return <>
    <div className="wide tall QrWrapper">
      <QrReader
        onScan={val => {
          if (val === null) return
          console.log(val)
        }}
        onError={err => {
          console.error(err)
          setError(err)
        }}
      ></QrReader>
    </div>
    {error && <div className="wide Center">{error}</div>}
    <Reset></Reset>
  </>
}

export default Review