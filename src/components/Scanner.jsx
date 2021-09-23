import React, { useState } from "react"

import Reset from "./inputs/Reset"
import QrReader from "react-qr-reader"

import "./Scanner.scss"

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
        }}
      ></QrReader>
    </div>
    <Reset></Reset>
  </>
}

export default Review