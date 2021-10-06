import React, { useContext, useEffect, useState } from "react"
import { Context } from "../../state"
import PropTypes from "prop-types"
import * as serviceWorkerRegistration from "../../serviceWorkerRegistration"

import "./buttons.scss"

const PWA = ({ modes }) => {
  const [state, dispatch] = useContext(Context)
  const [status, setStatus] = useState(
    "serviceWorker" in navigator
      ? navigator.serviceWorker.ready
        ? "ready for offline use"
        : "not ready for offline use"
      : "no offline support"
  )

  useEffect(() => {
    serviceWorkerRegistration.register({
      onSuccess: () => setStatus("installed for offline use"),
      onUpdate: () => {
        setStatus("tap to apply update")
      },
    })
  }, [])

  return (
    <button
      className="wide blue"
      hidden={!(modes ?? []).includes(state.mode)}
      disabled={true}
      onClick={() => {
        // lol
      }}
    >
      {status}
    </button>
  )
}

PWA.propTypes = {
  modes: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default PWA
