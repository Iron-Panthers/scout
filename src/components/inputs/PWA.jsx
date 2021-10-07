import React, { useContext, useEffect, useState } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"
import * as serviceWorkerRegistration from "../../serviceWorkerRegistration"

import "./buttons.scss"

const PWA = ({ modes }) => {
  const [state] = useContext(Context)
  const [status, setStatus] = useState(
    "serviceWorker" in navigator ? false : "no offline support"
  )
  const [swStatus, setSwStatus] = useState("determining offline support")

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((ready) => {
        setSwStatus(
          ready ? "ready for offline use" : "not ready for offline use"
        )
      })
    }
  }, [])

  useEffect(() => {
    serviceWorkerRegistration.register({
      onSuccess: () => setStatus("now ready for offline use"),
      onUpdate: () => {
        setStatus("tap to apply update")
      },
      onWaiting: () => {
        setStatus("tap to apply update")
      },
      onError: () => setStatus("serviceworker error"),
    })
  }, [])

  return (
    <button
      className="wide blue"
      hidden={!(modes ?? []).includes(state.mode)}
      disabled={status !== "tap to apply update"}
      onClick={() => {
        // lol
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
