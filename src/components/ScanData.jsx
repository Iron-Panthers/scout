import React, { useContext, useEffect, useMemo, useState } from "react"
import Reset from "./inputs/Reset"
import QRCode from "react-qr-code";

import { Context } from "../state";
import { stateToCsv } from "../csv";

import useWindowSize from "../hooks/useWindowSize";

import "./inputs/QRCode.scss";

const ScanData = () => {
  const [state, dispatch] = useContext(Context)

  const win = useWindowSize()
  const size = Math.min(win.width, win.height) - 100

  const value = useMemo(
    () => stateToCsv(state),
    [state]
  )
  console.log(value)
  return <>
    <Reset wide></Reset>
    <div className="qr"><QRCode value={value} size={size}></QRCode></div>
  </>
}

export default ScanData