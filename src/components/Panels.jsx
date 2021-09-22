import React, { useContext } from 'react'

import { Context } from '../state'
import Configure from './Configure'
import Scout from './Scout'

export const Panels = props => {
  const [state, dispatch] = useContext(Context)
  //IIFE for clean code lol
  const panel = (() => {
    switch (state.mode) {
      case "Configure":
        return <Configure></Configure>
      case "Scout":
        return <Scout></Scout>
      default:
        return <>
          <div>unspeakable horrors have occurred.</div>
          <div>pray.</div>
        </>
    }
  })()
  return <div className="panel">{panel}</div>
}