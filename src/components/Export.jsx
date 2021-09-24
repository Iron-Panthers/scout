import React, { useRef, useState } from "react"

import Reset from "./inputs/Reset"

import "./inputs/inputs.scss"

const Export = () => {
  const scans = JSON.parse(localStorage.scanSet ?? '[]').map(str => JSON.parse(str))

  return <>
    <div className="Center">{`Scanned ${scans.length}`}</div>
    <Reset></Reset>
  </>
}

export default Export