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
}

const history = []
// think of a frame like a discrete state - I think I made up the term!
const addFrame = (state) => {
  if (history.length >= 10) history.shift()
  history.push({ ...state })
  return state
}
const modFrame = (state) => {
  history[history.length] = { ...state }
  return state
}
const popFrame = (state) => history.length > 0 ? history.pop() : state
const clearFrames = (state) => {
  history.length = 0
  return state
}

export const reducer = (state, action) => {
  console.log([...history])
  switch (action.type) {
    case "reset":
      return clearFrames(initialState)
    case "next_mode":
      const modes = ["Configure", "Scout", "Review", "ScanData"]
      return clearFrames({
        ...state,
        mode: modes[modes.indexOf(state.mode) + 1]
      })
    case "leveled":
      return modFrame(state.endgame.levelTime === undefined ? {
        ...state,
        endgame: {
          ...state.endgame,
          levelTime: action.time
        }
      } : state)
    // base reducer, no special behavior
    case "set":
      console.log(action.prop, "=", action.val)
      return addFrame({
        ...state,
        [action.prop]: action.val
      })
    // base reducer for phases, spaghetti
    case "setInPhase":
      console.log(action.prop, "=", action.val, "in", state.phase)
      return addFrame({
        ...state,
        [state.phase]: {
          ...state[state.phase],
          [action.prop]: action.val
        }
      })
    default:
      return state
  }
}