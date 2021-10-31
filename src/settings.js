const initialSettings = {
  // semver.org
  version: {
    // 0.1.0
    major: 0,
    minor: 1,
    patch: 0,
  },
}

// this is a function so that it remains reflective of localStorage if its reset
// this could also be used to get a read only copy of settings outside a component
export const getSettings = () => ({
  ...JSON.parse(localStorage.settings ?? "{}"),
  ...initialSettings,
})

export const initialLocalSettings = getSettings()

export const reducer = (settings, action) => {
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
