import React, { useContext, useState, useEffect, useRef } from "react"
import { Context } from "../../state"

const Timer = ({ timeRef, wide }) => {
  const [, dispatch] = useContext(Context)

  const [timeLeft, setTimeLeft] = useState(150)
  const [started, setStarted] = useState(false)
  const interval = useRef()

  const tickTimer = () => {
    setTimeLeft(prevTime => {
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
  useEffect(() => {
    if (timeLeft === 135) {
      dispatch({ type: "set_phase", phase: "teleop" })
    } else if (timeLeft === 30) {
      dispatch({ type: "set_phase", phase: "endgame" })
    }
  }, [timeLeft, dispatch])

  // handle timer cleanup
  useEffect(() => () => {
    if (interval.current) {
      clearInterval(interval.current)
      console.log("killed timer")
    }
  }, [])


  return started ? <p className={wide ? "wide" : ""}>{`Time: ${timeLeft}`}</p> : <button
    className={`green ${wide ? "wide" : ""}`}
    onClick={
      () => {
        setStarted(true)
        interval.current = setInterval(tickTimer, 1000)
      }
    }
  >START</button>
}

export default Timer