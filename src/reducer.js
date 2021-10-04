const shooting = {
  innerOuterSucc: 0,
  innerOuterFail: 0,
  lowerSucc: 0,
  lowerFail: 0,
}

export const initialState = {
  mode: "Configure", // Configure, Scout, Review, ScanData
  team: undefined,
  matchType: "Qualification", //Test, Practice, Qualification, Quarterfinal, Semifinal, Final
  matchNum: undefined,
  phase: "auto", //auto, teleop, endgame
  auto: {
    pathType: "NONE",
    ...shooting,
  },
  teleop: {
    ...shooting,
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
  undoStack: {
    auto: [],
    teleop: [],
    endgame: [],
  },
}

const addUndo = (state, action) => {
  // only add an undo in Scout mode
  if (state.mode !== "Scout" || action.undo === true) return state.undoStack
  console.log(state.undoStack[state.phase])
  const undoStack = [...state.undoStack[state.phase]]
  if (state.undoStack[state.phase].length >= 15) {
    undoStack.shift()
  }

  undoStack.push({
    type: action.type,
    phase: state.phase,
    prop: action.prop,
    prior: action.prior,
    val:
      action.type === "setInPhase"
        ? state[state.phase][action.prop]
        : state[action.prop],
  })

  return {
    ...state.undoStack,
    [state.phase]: undoStack,
  }
}

const popUndo = (state) => {
  if (state.undoStack[state.phase].length < 1) return state
  const newStack = [...state.undoStack[state.phase]]
  const action = { undo: true, ...newStack.pop() }

  console.log(action)

  return {
    ...reducer(state, action),
    undoStack: {
      ...state.undoStack,
      [state.phase]: newStack,
    },
  }
}

const clearUndo = (state) => {
  state.undoStack = {
    auto: [],
    teleop: [],
    endgame: [],
  }
  return state
}

export const reducer = (state, action) => {
  if (action.prior !== undefined) action.prior(action.undo ?? false)
  switch (action.type) {
    case "reset":
      return initialState
    case "next_mode":
      const modes = ["Configure", "Scout", "Review", "ScanData"]
      return clearUndo({
        ...state,
        mode: modes[modes.indexOf(state.mode) + 1],
      })
    case "set_phase":
      return {
        ...state,
        phase: action.phase,
      }
    case "undo":
      return popUndo(state)
    case "level":
      return {
        ...state,
        endgame: {
          ...state.endgame,
          levelTime: action.undo ? undefined : action.time,
        },
      }
    // base reducer, no special behavior
    case "set":
      console.log(action.prop, "=", action.val)

      return {
        ...state,
        [action.prop]: action.val,
        undoStack: addUndo(state, action),
      }
    // base reducer for phases, spaghetti
    case "setInPhase":
      console.log(action.prop, "=", action.val, "in", state.phase)
      return {
        ...state,
        [state.phase]: {
          ...state[state.phase],
          [action.prop]: action.val,
        },
        undoStack: addUndo(state, action),
      }
    default:
      return state
  }
}
