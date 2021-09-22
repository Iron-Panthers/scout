import React, { useContext } from 'react'

import { Context } from '../state'
import Configure from './Configure'

export const Panels = props => {
  const [ state, dispatch ] = useContext(Context)
  // an empty but safe return
  let panel = <></>
  if(state.mode === "Configure") {
    panel = <Configure></Configure>
  }
  return <div className="panel">{panel}</div>
}