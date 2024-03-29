import React, { useContext, useEffect, useRef, useState, } from "react"
import useAnim from "../../hooks/useAnim"
import { Context, useSettings } from "../../state"
import PropTypes from "prop-types"
import * as serviceWorkerRegistration from "../../serviceWorkerRegistration"
import antiUnload from "../../antiUnload"
import { FaCog } from "react-icons/fa"

import SetPanel from "./SetPanel"

import "./buttons.scss"
import "./PWA.scss"
import "./inputs.scss"


const PWA = ({ modes }) => {
  const [state, dispatch] = useContext(Context)
  const [status, setStatus] = useState(
    "serviceWorker" in navigator ? false : "no offline support (swNav)"
  )
  const [swStatus, setSwStatus] = useState("determining offline support")

  const [anim, onAnimEnd] = useAnim(
    status !== false ? status : swStatus,
    ["updating...", "tap to apply update"].includes(status)
  )

  const waiting = useRef(null)


  const [settings] = useSettings()
  const isIOS =
    ([
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)) &&
    settings.IOSCheck


  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((ready) => {
        setSwStatus(
          ready ? "ready for offline use" : "not ready for offline use"
        )
      })
    }
    const timeout = setTimeout(() => {
      setSwStatus((swStatus) =>
        swStatus !== "determining offline support"
          ? swStatus
          : "no offline support (swStatus)"
      )
    }, 5_000)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const updatable = (reg) => {
      waiting.current = reg.waiting
      setStatus("tap to apply update")
    }
    serviceWorkerRegistration.register({
      onSuccess: () => setStatus("now ready for offline use"),
      onUpdate: updatable,
      onWaiting: updatable,
      onError: () => setStatus("serviceworker error!"),
    })
  }, [])

  const isHidden = !(modes ?? []).includes(state.mode) ? " hidden" : "";

  return (
    <>
     <button className = {`${isIOS? "wide": "halfWide"} blue ${isHidden}`}
        id = "switchScoutingType"
        onClick={() => {
          dispatch({
            type: "set",
            prop: "mode",
            val: state.typeOfData === "Match" ?  "ConfigQualitative" : "Configure",
          })
          dispatch({
            type: "set", 
            prop: "typeOfData", 
            val: state.typeOfData === "Match" ?  "Qualitative" : "Match"})
        }}>
      {state.typeOfData === "Match" ? "Switch to Qualitative" : "Switch to Match"}
      </button>
    
      {!isIOS && <SetPanel width = {`halfWide ${isHidden}`} label="Scanner" panelName="Scanner"></SetPanel>}

      {/* <button className = {`halfWide blue ${isHidden}`}
        id = "settingsWideButton"
        onClick={() => {
          dispatch({
            type: "set",
            prop: "mode",
            val: "Settings",
          })
        }}>
      Settings
      </button> */}
    <div
      className={`wide PWA ${isHidden}`}
    >
      <button
        className="blue"
        animate={anim}
        onAnimationEnd={onAnimEnd}
        disabled={status !== "tap to apply update"}
        onClick={() => {
          waiting.current.addEventListener("statechange", (e) => {
            if (e.target.state === "activated") window.location.reload()
          })
          window.removeEventListener("beforeunload", antiUnload)
          waiting.current.postMessage({ type: "SKIP_WAITING" })
          setStatus("updating...")
        }}
      >
        {(state.mode === "Configure" ? "Match Scouting".toUpperCase() : "Qualitative Scouting".toUpperCase()) + "\n\n"}
        {status !== false ? status : swStatus}
      </button>
      <button
        className="green"
        id="Settings"
        onClick={() => {
          dispatch({
            type: "set",
            prop: "mode",
            val: "Settings",
          })
        }}
      >
        <FaCog />
      </button>
    </div>
    </>
  )
}

PWA.propTypes = {
  modes: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default PWA
