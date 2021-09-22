export const reducer = (state, action) => {
  switch (action.type) {
    case "set_team":
      return {
        ...state,
        team: action.val
      }
    default:
      return state
  }
}

export const initialState = {
  mode: "Configure",
  team: undefined
}