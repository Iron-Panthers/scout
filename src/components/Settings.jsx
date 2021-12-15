import React, { useMemo } from "react"
import { initialSettings, settingsLabels } from "../settings"
import { useSettings } from "../state"
import Checkbox from "./inputs/Checkbox"
import Reset from "./inputs/Reset"

const Settings = () => {
  const [settings, dispatch] = useSettings()
  const version = settings.version
  const checkboxes = useMemo(() => {
    const { version: _version, ...settingsIter } = { ...settings }
    return Object.entries(settingsIter).map(([key, val]) => (
      <Checkbox
        useCtx={useSettings}
        label={settingsLabels[key] ?? key}
        prop={key}
        key={key}
        warn={initialSettings[key] !== val}
      />
    ))
  }, [settings])
  return (
    <>
      <p>{`Iron Pants 5026${Math.random() <= 0.1 ? "?" : "!"}`}</p>
      <p>{`scout v${version.major}.${version.minor}.${version.patch}`}</p>
      {checkboxes}
      <Reset wide></Reset>
    </>
  )
}

export default Settings
