import React, { useContext } from "react"
import { reducer, initialState } from "./reducer"
import { reducer as settingsReducer, initialLocalSettings } from "./settings"

export const Context = React.createContext({
  state: initialState,
  dispatch: () => null,
})

export const useAppState = () => useContext(Context)

export const Settings = React.createContext({
  state: initialLocalSettings,
  dispatch: () => null,
})

export const useSettings = () => useContext(Settings)

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
