const shooting = {
  innerOuterSucc: 0,
  innerOuterFail: 0,
  lowerSucc: 0,
  lowerFail: 0
}

export const initialState = {
  mode: "Configure", // Configure, Scout, Review, ScanData
  team: undefined,
  matchType: "Qualification", //Test, Practice, Qualification, Quarterfinal, Semifinal, Final
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
  undoStack: {
    auto: [],
    teleop: [],
    endgame: [],
  }
}

const addUndo = (state, action) => {
  // only add an undo in Scout mode
  if (state.mode !== "Scout") return
  console.log(state.undoStack[state.phase])
  const undoStack = [...state.undoStack[state.phase]]
  if (state.undoStack[state.phase].length >= 15) {
    undoStack.shift()
  }

  undoStack.push({
    type: action.type,
    phase: state.phase,
    prop: action.prop,
    val: action.type === "setInPhase" ?
      state[state.phase][action.prop]
      :
      state[action.prop],
  })

  return {
    ...state.undoStack,
    [state.phase]: undoStack
  }
}

const popUndo = (state) => {
  if (state.undoStack[state.phase].length < 1) return state
  const newStack = [...state.undoStack[state.phase]]
  const action = newStack.pop()

  console.log(action)

  if (action.type === "set") return {
    ...state,
    [action.prop]: action.val,
    undoStack: {
      ...state.undoStack,
      [state.phase]: newStack
    }
  }
  return {
    ...state,
    [action.phase]: {
      ...state[action.phase],
      [action.prop]: action.val
    },
    undoStack: {
      ...state.undoStack,
      [state.phase]: newStack
    }
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
  switch (action.type) {
    case "reset":
      return initialState
    case "next_mode":
      const modes = ["Configure", "Scout", "Review", "ScanData"]
      return clearUndo({
        ...state,
        mode: modes[modes.indexOf(state.mode) + 1]
      })
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

      return {
        ...state,
        [action.prop]: action.val,
        undoStack: addUndo(state, action)
      }
    // base reducer for phases, spaghetti
    case "setInPhase":
      console.log(action.prop, "=", action.val, "in", state.phase)
      return {
        ...state,
        [state.phase]: {
          ...state[state.phase],
          [action.prop]: action.val
        },
        undoStack: addUndo(state, action)
      }
    default:
      return state
  }
}