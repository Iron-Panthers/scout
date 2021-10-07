import React, { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"
import * as serviceWorkerRegistration from "../../serviceWorkerRegistration"
import { antiUnload } from "../.."

import "./buttons.scss"

const PWA = ({ modes }) => {
  const [state, dispatch] = useContext(Context)
  const [status, setStatus] = useState(
    "serviceWorker" in navigator ? false : "no offline support"
  )
  const [swStatus, setSwStatus] = useState("determining offline support")

  const waiting = useRef(null)

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((ready) => {
        setSwStatus(
          ready ? "ready for offline use" : "not ready for offline use"
        )
      })
    }
    const timeout = setTimeout(() => {
      setSwStatus((swStatus) => {
        if (swStatus === "determining offline support") {
          setSwStatus("no offline support")
        }
      })
    }, 2000)
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
      onError: () => setStatus("serviceworker error"),
    })
  }, [])

  return (
    <button
      className="wide blue"
      hidden={!(modes ?? []).includes(state.mode)}
      disabled={status !== "tap to apply update"}
      onClick={() => {
        waiting.current.addEventListener("statechange", (e) => {
          if (e.target.state === "activated") window.location.reload()
        })
        window.removeEventListener("beforeunload", antiUnload)
        waiting.current.postMessage({ type: "SKIP_WAITING" })
      }}
    >
      {status !== false ? status : swStatus}
    </button>
  )
}

PWA.propTypes = {
  modes: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default PWA
