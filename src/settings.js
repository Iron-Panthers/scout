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
export const persistentSettings = () => ({
  ...JSON.parse(localStorage.settings ?? "{}"),
  ...initialSettings,
})

export const reducer = (settings, action) => {
  switch (action.type) {
    case "reset":
      delete localStorage.settings
      return persistentSettings()
    case "set":
      return {
        ...settings,
        [action.prop]: action.val,
      }
    default:
      return settings
  }
}
