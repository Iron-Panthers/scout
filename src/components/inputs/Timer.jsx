import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"

import "./inputs.scss"

const Timer = ({ timeRef, wide }) => {
  const [timeLeft, setTimeLeft] = useState(150)
  const [started, setStarted] = useState(false)
  const interval = useRef()

  const tickTimer = () => {
    setTimeLeft((prevTime) => {
      const time = prevTime - 1
      timeRef.current = time
      setTimeLeft(time)

      // handle ending
      if (time <= 0) {
        clearInterval(interval.current)
        interval.current = undefined
        console.log("timer done")
      }
    })
  }

  // handle tab switching
  // useEffect(() => {
  //   if (timeLeft === 135) {
  //     dispatch({ type: "set_phase", phase: "teleop" })
  //   } else if (timeLeft === 30) {
  //     dispatch({ type: "set_phase", phase: "endgame" })
  //   }
  // }, [timeLeft, dispatch])

  // handle timer cleanup
  useEffect(
    () => () => {
      if (interval.current) {
        clearInterval(interval.current)
        console.log("killed timer")
      }
    },
    []
  )

  const wideStr = wide ? "wide" : ""

  return started ? (
    <p className={`timer ${wideStr}`}>{`Time: ${timeLeft}`}</p>
  ) : (
    <button
      className={`green ${wideStr}`}
      onClick={() => {
        setStarted(true)
        interval.current = setInterval(tickTimer, 1000)
      }}
    >
      START
    </button>
  )
}

Timer.propTypes = {
  timeRef: PropTypes.shape({ current: PropTypes.number }).isRequired,
  wide: PropTypes.bool,
}

export default Timer
