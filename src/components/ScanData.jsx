import React, { useContext, useMemo } from "react"
import Reset from "./inputs/Reset"
import QRCode from "react-qr-code"

import { Context } from "../state"
import { stateToCsv } from "../csv"

import useWindowSize from "../hooks/useWindowSize"

import "./inputs/QRCode.scss"

/**
 * Produces and displays QR code for scanning
 */
const ScanData = () => {
  const [state] = useContext(Context)

  const win = useWindowSize()
  const size = Math.min(512, Math.min(win.width, win.height) - 100)

  const value = useMemo(() => stateToCsv(state), [state])
  console.log(value)
  return (
    <>
      <Reset width = "wide"></Reset>
      <div className="veryTall wide qr">
        <QRCode value={value} size={size}></QRCode>
      </div>
    </>
  )
}

export default ScanData
