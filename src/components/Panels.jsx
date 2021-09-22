import React, { useContext } from 'react'

import { Context } from '../state'
import Configure from './Configure'

export const Panels = props => {
  const [ state, dispatch ] = useContext(Context)
  let panel
  if(state.mode === "Configure") {
    panel = <Configure></Configure>
  }
  return panel
}