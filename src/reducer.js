import produce from "immer"
import set from "lodash.set"

import { getSettings } from "./settings"
const csvApi = require("../package.json").csvApi

export const version = csvApi ?? 69

const grid = {
  topCone: 0, 
  middleCone: 0,
  bottomCone: 0,
  topCube: 0, 
  middleCube: 0, 
  bottomCube: 0,
}

export const initialState = {
  version, // this one should not be changed, but there is no other way to ensure it is always included
  mode: "Configure", // Configure, Scout, Review, ScanData, Settings
  team: undefined,
  matchType: "Qualification", //Test, Practice, Qualification
  matchNum: undefined,
  phase: "auto", //auto, teleop, endgame
  auto: {
    mobility: false,
    docked: false,
    engaged: false,
    fail: 0,
    ...grid,
  },
  teleop: {
    defense: false,
    fail: 0,
    ...grid,
  },
  endgame: {
    docked: false,
    engaged: false,
    community: false,
  },
  scoutProblems: false,
  robotProblems: false,
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
  // console.log(state.undoStack[state.phase])
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

  // console.log(action)

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
  // when we have a prior, call it and pass in a fresh reducer
  if (action.prior !== undefined) {
    action.prior((priorAction) => {
      state = reducer(state, priorAction)
    }, action.undo ?? false)
  }
  switch (action.type) {
    case "reset":
      return {
        ...initialState,
        matchNum:
          typeof state.matchNum === "number" && getSettings().autoIncMatch
            ? state.matchNum + 1
            : initialState.matchNum,
        matchType: state.matchType,
      }
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
      // console.log(action.prop, "=", action.val)

      return {
        ...state,
        [action.prop]: action.val,
        undoStack: addUndo(state, action),
      }
    // base reducer for phases, spaghetti
    case "setInPhase":
      // console.log(action.prop, "=", action.val, "in", state.phase)
      return {
        ...state,
        [state.phase]: {
          ...state[state.phase],
          [action.prop]: action.val,
        },
        undoStack: addUndo(state, action),
      }
    case "pathSet":
      return produce(state, (draft) => {
        set(draft, action.path, action.val)
      })
    default:
      return state
  }
}
