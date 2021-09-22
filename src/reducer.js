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
      console.log(action.val)
      return {
        ...state,
        [action.prop]: action.val
      }
    default:
      return state
  }
}

const shooting = {
  innerOuterSucc: 0,
  innerOuterFail: 0,
  lowerSucc: 0,
  outerSucc: 0
}

export const initialState = {
  mode: "Configure",
  team: undefined,
  matchType: "Test",
  matchNum: undefined,
  timeLeft: 150, //seconds
  phase: "auto", //auto, teleop, endgame
  auto: {
    pathType: undefined,
    ...shooting
  },
  tele: {
    ...shooting
  },
  end: {
    climb: false,
    park: false,
    level: false, //level vs not level, not level is false
    levelTime: undefined //value of timeLeft when level is set
  },
  underTrench: false,
  defense: false,
  problems: false,
  comments: "",
}