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

const undoStack = {
  auto: [],
  teleop: [],
  endgame: [],
}

const addUndo = (state, action) => {
  // only add an undo in Scout mode
  if (state.mode !== "Scout") return
  // FIXME: *2 is because reducer is double called
  if (undoStack[state.phase].length >= 15 * 2) {
    undoStack[state.phase].shift()
  }

  const val = action.type === "setInPhase" ?
    state[state.phase][action.prop]
    :
    state[action.prop]

  undoStack[state.phase].push({ ...action, val, phase: state.phase })
  console.log(undoStack[state.phase])
}

const popUndo = (state) => {
  // do not be worried about the circular logic
  // javascript run, so no issues
  if (undoStack[state.phase].length < 1) return state
  const action = undoStack[state.phase].pop()
  console.log(undoStack[state.phase])
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

const clearUndo = () => {
  undoStack.auto.length = 0
  undoStack.teleop.length = 0
  undoStack.endgame.length = 0
}

export const reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      clearUndo()
      return initialState
    case "next_mode":
      clearUndo()
      const modes = ["Configure", "Scout", "Review", "ScanData"]
      return {
        ...state,
        mode: modes[modes.indexOf(state.mode) + 1]
      }
    case "set_phase":
      return {
        ...state,
        phase: action.phase
      }
    case "undo":
      return popUndo(state)
    // base reducer, no special behavior
    case "set":
      console.log(action.prop, "=", action.val)
      addUndo(state, action)
      return {
        ...state,
        [action.prop]: action.val
      }
    // base reducer for phases, spaghetti
    case "setInPhase":
      console.log(action.prop, "=", action.val, "in", state.phase)
      addUndo(state, action)
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