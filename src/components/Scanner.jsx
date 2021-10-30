import React, { useEffect, useRef, useState } from "react"

import Reset from "./inputs/Reset"
import QrReader from "react-qr-reader"
import SetPanel from "./inputs/SetPanel"

import useAnim from "../hooks/useAnim"

import "./Scanner.scss"
import "./inputs/inputs.scss"
import "./inputs/buttons.scss"

const Scanner = () => {
  const [error, setError] = useState(false)
  const scans = useRef(new Set(JSON.parse(localStorage.scanSet ?? "[]")))
  const [scanCount, setScanCount] = useState(scans.current.size)
  const [anim, onAnimEnd] = useAnim(scanCount)
  const [scanHint, setScanHint] = useState("")
  const [scan, setScan] = useState(true)
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
    osc.stop(time + 0.1)
  }

  useEffect(() => {
    ctx.current = new (window.AudioContext || window.webkitAudioContext)()
    return () => ctx.current.close()
  }, [ctx])

  return (
    <>
      {scan && (
        <div className="QrWrapper" animate={anim} onAnimationEnd={onAnimEnd}>
          <QrReader
            onScan={(val) => {
              if (val === null) {
                if (scanHint !== "") setScanHint("")
                return
              }
              if (!scans.current.has(val)) {
                scans.current.add(val)
                setScanCount(scanCount + 1)
                localStorage.scanSet = JSON.stringify(Array.from(scans.current))
                beep()
                setScanHint("stored")
              } else {
                setScanHint("already scanned")
              }
            }}
            onError={(err) => {
              console.error(err)
              setError(err)
            }}
          ></QrReader>
        </div>
      )}
      <button
        className={`wide ${scan ? "red" : "green"}`}
        onClick={() => setScan(!scan)}
      >
        {scan ? "Stop" : "Start"}
      </button>
      <div className="Center wide">{`Scanned ${scanCount} ${
        scanHint !== "" ? " - " : ""
      }${scanHint.toUpperCase()}`}</div>
      {error && <div className="wide Center">{error}</div>}
      <SetPanel label="Export" panelName="Export"></SetPanel>
      <Reset></Reset>
    </>
  )
}

export default Scanner
