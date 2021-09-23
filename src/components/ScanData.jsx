import React, { useContext, useMemo } from "react"
import Reset from "./inputs/Reset"
import QRCode from "react-qr-code";

import { Context } from "../state";

import "./inputs/QRCode.scss";

const ScanData = () => {
  const [state, dispatch] = useContext(Context)
  const value = useMemo(
    () => JSON.stringify({
      ...state,
      mode: undefined,
      phase: undefined,
    }),
    [state]
  )
  const size = window.innerWidth - 100
  return <>
    <div className="qr"><QRCode value={JSON.stringify(state)} size={size}></QRCode></div>
    <Reset></Reset>
  </>
}

export default ScanData