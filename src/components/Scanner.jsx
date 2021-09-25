import React, { useEffect, useRef, useState } from "react"

import Reset from "./inputs/Reset"
import QrReader from "react-qr-reader"
import SetPanel from "./inputs/SetPanel"

import "./Scanner.scss"
import "./inputs/inputs.scss"

const Review = () => {
  const [error, setError] = useState(false)
  const scans = useRef(new Set(JSON.parse(localStorage.scanSet ?? '[]')))
  const [scanCount, setScanCount] = useState(scans.current.size)
  const ctx = useRef({})
  const beep = () => {
    const time = ctx.current.currentTime
    const osc = ctx.current.createOscillator()
    const gain = ctx.current.createGain()

    osc.connect(gain)
    gain.connect(ctx.current.destination)

    osc.onended = () => {
      gain.disconnect(ctx.current.destination)
      osc.disconnect(gain)
    }

    osc.type = "sine"
    osc.frequency.value = 550
    osc.start(time)
    osc.stop(time + .1)
  }

  useEffect(() => {
    ctx.current = new (window.AudioContext || window.webkitAudioContext)()
    return () => ctx.current.close()
  }, [ctx])

  return <>
    <div className="QrWrapper">
      <QrReader
        onScan={val => {
          if (val === null) return
          if (!scans.current.has(val)) {
            scans.current.add(val)
            setScanCount(scanCount + 1)
            localStorage.scanSet = JSON.stringify(Array.from(scans.current))
            beep()
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
    <SetPanel label="Export" panelName="Export"></SetPanel>
    <Reset></Reset>
  </>
}

export default Review