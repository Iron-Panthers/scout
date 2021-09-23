import React, { useContext, useMemo } from "react"
import Reset from "./inputs/Reset"
import QRCode from "react-qr-code";

import { Context } from "../state";

import "./inputs/QRCode.scss";

const Scan = () => {
  const [state, dispatch] = useContext(Context)
  const value = useMemo(
    () => JSON.stringify(state),
    [state]
  )
  return <>
    <div className="qr"><QRCode value={JSON.stringify(state)} size={350}></QRCode></div>
    <Reset></Reset>
  </>
}

export default Scan