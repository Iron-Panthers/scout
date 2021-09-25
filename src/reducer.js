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

export const reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState
    case "next_mode":
      const modes = ["Configure", "Scout", "Review", "ScanData"]
      return {
        ...state,
        mode: modes[modes.indexOf(state.mode) + 1]
      }
    case "leveled":
      console.log(action.time)
      return state.endgame.levelTime === undefined ? {
        ...state,
        endgame: {
          ...state.endgame,
          levelTime: action.time
        }
      } : state
    // base reducer, no special behavior
    case "set":
      console.log(action.prop, "=", action.val)
      return {
        ...state,
        [action.prop]: action.val
      }
    // base reducer for phases, spaghetti
    case "setInPhase":
      console.log(action.prop, "=", action.val, "in", state.phase)
      return {
        ...state,
        [state.phase]: {
          ...state[state.phase],
          [action.prop]: action.val
        }
      }
    default:
      return state
  }
}