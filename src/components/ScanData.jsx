import React, { useContext, useMemo } from "react"
import Reset from "./inputs/Reset"
import QRCode from "react-qr-code";
import Papa from "papaparse";

import { Context } from "../state";
import { stateToCsv } from "../csv";

import "./inputs/QRCode.scss";

const ScanData = () => {
  const [state, dispatch] = useContext(Context)
  const value = useMemo(
    () => stateToCsv(state),
    [state]
  )
  console.log(value)
  const size = Math.min(window.innerWidth, window.innerHeight) - 100
  return <>
    <div className="qr"><QRCode value={value} size={size}></QRCode></div>
    <Reset wide></Reset>
  </>
}

export default ScanData