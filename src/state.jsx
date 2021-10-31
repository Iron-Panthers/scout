import React from "react"
import { reducer, initialState } from "./reducer"
import { reducer as settingsReducer, initialLocalSettings } from "./settings"

export const Context = React.createContext({
  state: initialState,
  dispatch: () => null,
})

export const Settings = React.createContext({
  state: initialLocalSettings,
  dispatch: () => null,
})

export const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const [settings, settingsDispatch] = React.useReducer(
    settingsReducer,
    initialLocalSettings
  )

  return (
    <Context.Provider value={[state, dispatch]}>
      <Settings.Provider value={[settings, settingsDispatch]}>
        {children}
      </Settings.Provider>
    </Context.Provider>
  )
}
