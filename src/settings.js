const version = require("../package.json").version
const vArray = version.split(".")
export const initialSettings = {
  // semver.org
  version: {
    // 0.1.0
    major: parseInt(vArray[0] ?? 0),
    minor: parseInt(vArray[1] ?? 0),
    patch: parseInt(vArray[2] ?? 0),
  },
  autoIncMatch: true, // increase match number by 1 on reset
  IOSCheck: true,
  scannerBeep: true,
  exportWithHeaders: true,
  switchScoutingSide: false, // switches the scouting side
}

export const settingsLabels = {
  autoIncMatch: "automatically increase match number by one when reset",
  IOSCheck: "userAgent parsing to detect iOS",
  scannerBeep: "beep feedback on successful scan",
  exportWithHeaders: "export the csv data with the headers",
  switchScoutingSide: "rotate the field view 180 degrees",
}

// this is a function so that it remains reflective of localStorage if its reset
// this could also be used to get a read only copy of settings outside a component
// handle version upgrade here
export const getSettings = () => ({
  ...initialSettings,
  ...JSON.parse(localStorage.settings ?? "{}"),
  version: {
    ...initialSettings.version,
  },
})

export const initialLocalSettings = getSettings()

const internalReducer = (settings, action) => {
  switch (action.type) {
    case "reset":
      delete localStorage.settings
      return getSettings()
    case "set":
      return {
        ...settings,
        [action.prop]: action.val,
      }
    default:
      return settings
  }
}

export const reducer = (settings, action) => {
  const newSettings = internalReducer(settings, action)
  localStorage.settings = JSON.stringify(newSettings)
  return newSettings
}
