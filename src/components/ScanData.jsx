import React, { useContext, useMemo } from "react"
import Reset from "./inputs/Reset"
import QRCode from "react-qr-code";
import Papa from "papaparse";

import { Context } from "../state";
import { cleanState, fields } from "../csv";

import "./inputs/QRCode.scss";

const ScanData = () => {
  const [state, dispatch] = useContext(Context)
  const value = useMemo(
    () => {
      console.log(cleanState(state))
      return Papa.unparse({
        fields: fields,
        data: Object.entries(cleanState(state)).map(([, val]) => val),
      }, {
        header: true
      })
    },
    [state]
  )
  console.log(value)
  const size = window.innerWidth - 100
  return <>
    <div className="qr"><QRCode value={value} size={size}></QRCode></div>
    <Reset wide></Reset>
  </>
}

export default ScanData