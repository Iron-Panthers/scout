const shooting = {
  innerOuterSucc: 0,
  innerOuterFail: 0,
  lowerSucc: 0,
  lowerFail: 0
}

export const initialState = {
  mode: "Configure", // Configure, Scout, Review, ScanData
  team: undefined,
  matchType: "Test",
  matchNum: undefined,
  phase: "auto", //auto, teleop, endgame
  auto: {
    pathType: "NONE",
    ...shooting
  },
  teleop: {
    ...shooting
  },
  endgame: {
    climb: false,
    park: false,
    level: false,
    notLevel: false,
    levelTime: undefined, //value of timeLeft when level is set
    levelQuality: "None",
  },
  underTrench: false,
  defense: false,
  problems: false,
  comments: "",
  history: [],
}

const clearActions = (state) => {
  state.history.length = 0
  return state
}
const addAction = (state, action) => {
  if (state.history.length >= 15) state.history.shift()
  state.history.push({
    type: action.type,
    prop: action.prop,
    val: action.type === "set" ? state[action.prop] : state[state.phase][action.prop],
    phase: state.phase
  })
  return state
}
const popAction = (state) => {
  const action = state.history.pop()
  if (action === undefined) return state
  if (action.type === "set") return {
    ...state,
    [action.prop]: action.val
  }
  return {
    ...state,
    [action.phase]: {
      ...state[action.phase],
      [action.prop]: action.val
    }
  }
}

export const reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState
    case "next_mode":
      const modes = ["Configure", "Scout", "Review", "ScanData"]
      return clearActions({
        ...state,
        mode: modes[modes.indexOf(state.mode) + 1]
      })
    case "undo":
      console.log(state.history)
      return popAction(state)
    // base reducer, no special behavior
    case "set":
      console.log(action.prop, "=", action.val)
      return {
        ...addAction(state, action),
        [action.prop]: action.val
      }
    // base reducer for phases, spaghetti
    case "setInPhase":
      console.log(action.prop, "=", action.val, "in", state.phase)
      return {
        ...addAction(state, action),
        [state.phase]: {
          ...state[state.phase],
          [action.prop]: action.val
        }
      }
    default:
      return state
  }
}