import React, { useEffect, useRef, useState } from "react"
import { useSettings } from "../state"

import { version } from "../reducer"

import Reset from "./inputs/Reset"
import { useZxing } from "react-zxing";
import SetPanel from "./inputs/SetPanel"

import useAnim from "../hooks/useAnim"

import { parseCsvBody } from "../csv"

import "./Scanner.scss"
import "./inputs/inputs.scss"
import "./inputs/buttons.scss"
/**
 * Scans QR code to store its data
 */
const Scanner = () => {
  const [settings] = useSettings()

  const [error, setError] = useState(false)
  const matchScans = useRef(new Set(JSON.parse(localStorage.matchScanSet ?? "[]")))
  const qualScans = useRef(new Set(JSON.parse(localStorage.qualitativeScanSet ?? "[]")))
  const [scanCount, setScanCount] = useState(matchScans.current.size + qualScans.current.size)
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


  
const { ref } = useZxing({
        onDecodeResult(result) {
          console.log(result.getText())
          handleScan(result.getText())
    }, onError (err) {
            console.error(err)
            setError(err)
    }
});


const handleScan = (val) => {
    
      if (val === null) {
        if (scanHint !== "") setScanHint("")
        return
      }
      let objVal = parseCsvBody(val)
      console.log(objVal)
      const versionMatch = Number.parseInt(objVal.version) === version
      if ((!matchScans.current.has(val) && !qualScans.current.has(val)) && versionMatch) {

        setScanCount(scanCount + 1)

        // Checking if the quickness has been set
        // If it has, then the csv object must be from the qualitative scouting
        // Otherwise, it should be a normal match
        if(objVal?.team1Quickness) {
          qualScans.current.add(val)
          localStorage.qualitativeScanSet = JSON.stringify(Array.from(qualScans.current))
        } else {
          matchScans.current.add(val)
          localStorage.matchScanSet = JSON.stringify(Array.from(matchScans.current))
        }

        if (settings.scannerBeep) beep()
        setScanHint("stored")
      } else {
        setScanHint(
          !versionMatch ? "CSV versioning mismatch" : "already scanned"
        )
      }
}
  return (
    <>
      {scan && (
        <div className="QrWrapper wide veryTall" animate={anim} onAnimationEnd={onAnimEnd}>
            <video ref={ref}></video>
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
      <SetPanel width= "halfWide" label="Export" panelName="Export"></SetPanel>
      <Reset width = "halfWide"></Reset>
    </>
  )
}

export default Scanner
