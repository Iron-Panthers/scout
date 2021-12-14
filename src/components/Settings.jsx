import React from "react"
import { useSettings } from "../state"
import Checkbox from "./inputs/Checkbox"
import Reset from "./inputs/Reset"

const Settings = () => {
  const [settings, dispatch] = useSettings()
  const version = settings.version
  return (
    <>
      <p>{`Iron Pants 5026${Math.random() <= 0.1 ? "?" : "!"}`}</p>
      <p>{`scout v${version.major}.${version.minor}.${version.patch}`}</p>
      <Checkbox
        useCtx={useSettings}
        label="automatically increase match number by one when reset"
        prop="autoIncMatch"
      />
      <Checkbox
        useCtx={useSettings}
        label="disable userAgent parsing to detect iOS"
        prop="bypassIOSCheck"
      />
      <Checkbox
        useCtx={useSettings}
        label="enable beep feedback on successful scan"
        prop="scannerBeep"
      />
      <Reset wide></Reset>
    </>
  )
}

export default Settings
