export const reducer = (state, action) => {
  switch (action.type) {
    case "next_mode":
      const modes = [ "Configure", "Scout", "Review", "Scan" ]
      return {
        ...state,
        mode: modes[modes.indexOf(state.mode) + 1]
      }
    // base reducer, no special behavior
    case "set":
      return {
        ...state,
        [action.prop]: action.val
      }
    default:
      return state
  }
}

export const initialState = {
  mode: "Configure",
  team: undefined
}