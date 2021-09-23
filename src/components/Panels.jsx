import React, { useContext } from 'react'

import { Context } from '../state'
import Configure from './Configure'
import Review from './Review'
import Scout from './Scout'
import ScanData from './ScanData'

import "./Panels.scss"

export const Panels = props => {
  const [state, ] = useContext(Context)
  //IIFE for clean code lol
  const panel = (() => {
    switch (state.mode) {
      case "Configure":
        return <Configure></Configure>
      case "Scout":
        return <Scout></Scout>
      case "Review":
        return <Review></Review>
      case "ScanData":
        return <ScanData></ScanData>
      default:
        return <>
          <div>unspeakable horrors have occurred.</div>
          <div>pray.</div>
        </>
    }
  })()
  return <div className="panel">{panel}</div>
}