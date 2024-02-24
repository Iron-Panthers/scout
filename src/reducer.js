import produce from "immer"
import set from "lodash.set"

import { getSettings } from "./settings"
const csvApi = require("../package.json").csvApi

export const version = csvApi ?? 69

const grid = {
  scoreSpeaker: 0,
  missSpeaker: 0,
  scoreAmp: 0,
  missAmp: 0,
}

const teamQual = {
  number: undefined,
  quickness: 1,
  fieldAwareness: 1,
}

export const initialState = {
  version, // this one should not be changed, but there is no other way to ensure it is always included
  mode: "Configure", // Configure, Scout, Review, ScanData, Settings, ConfigQualitative
  team: undefined,
  /**
   * practice (Practice)
   * qm (Qualification)
   * sf (Semifinals
   * f (Finals)
   */
  matchType: "qm",
  typeOfData: "Match", // Match or Qualitative
  matchNum: undefined,
  phase: "auto", //auto, teleop, endgame
  scoutName: "",
  startTime: 0,
  auto: {
    mobility: false,
    path: [],
    actions: [],
    ...grid,
    dropoff: 0,
  },
  teleop: {
    actions: [],
    ...grid,
    scoreTrap: 0,
    shuttle: 0,
  },
  endgame: {
    harmonize: false,
    climb: false,
    park: false,
    climbTimeOfStart: undefined,
  },
  defense: false,
  scoutProblems: false,
  robotProblems: false,
  comments: "",
  // Qualitative attributes... I don't want to deal with phase anymore

  team1: {
    ...teamQual,
  },
  team2: {
    ...teamQual,
  },
  team3: {
    ...teamQual,
  },

  undoStack: {
    auto: [],
    teleop: [],
    endgame: [],
  },
}

const addUndo = (state, action) => {
  // only add an undo in Scout mode
  // or if it's not setting the start time

  if (state.mode !== "Scout" || action.undo === true || action.track === false)
    return state.undoStack
  // console.log(state.undoStack[state.phase])
  const undoStack = [...state.undoStack[state.phase]]
  if (state.undoStack[state.phase].length >= 15) {
    undoStack.shift()
  }

  const prevState = action.type === "setInPhase" ? state[state.phase] : state

  console.log(prevState)
  console.log(action.prop)
  console.log(prevState[action.prop])

  let vals = prevState[action.prop]
  if (Array.isArray(action.prop)) {
    vals = []
    for (const prop of action.prop) {
      vals.push(prevState[prop])
    }
  }

  undoStack.push({
    type: action.type,
    phase: state.phase,
    prop: action.prop,
    prior: action.prior,
    val: vals,
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
        mode: state.typeOfData === "Match" ? "Configure" : "ConfigQualitative",
        typeOfData: state.typeOfData,
        scoutName: state.scoutName,
      }
    case "next_mode":
      const modes = ["Configure", "Scout", "Review", "ScanData"]
      return clearUndo({
        ...state,
        mode: modes[modes.indexOf(state.mode) + 1],
      })
    case "next_qualitative_mode":
      const qualitativeModes = ["ConfigQualitative", "Qualitative", "ScanData"]
      return clearUndo({
        ...state,
        mode: qualitativeModes[qualitativeModes.indexOf(state.mode) + 1],
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
    // base reducer
    case "set":
      console.log(action.prop, "=", action.val)

      let newState = {
        ...state,
      }
      if (Array.isArray(action.prop) && Array.isArray(action.val)) {
        for (let i = 0; i < action.prop.length; i++) {
          console.log(action.prop[i], "=", action.val[i])
          //maybe call ourselves? lol
          newState = {
            ...newState,
            [action.prop[i]]: action.val[i],
          }
        }
      } else {
        console.log()
        newState = {
          ...newState,
          [action.prop]: action.val,
        }
      }
      return {
        ...newState,
        undoStack: addUndo(state, action),
      }
    // base reducer for phases, spaghetti
    case "setInPhase":
      console.log(action.prop, "=", action.val, "in", state.phase)

      let newPhaseState = {
        ...state[state.phase],
      }

      if (Array.isArray(action.prop) && Array.isArray(action.val)) {
        for (let i = 0; i < action.prop.length; i++) {
          console.log(action.prop[i], "=", action.val[i])
          //maybe call ourselves? lol
          newPhaseState = {
            ...newPhaseState,
            [action.prop[i]]: action.val[i],
          }
        }
      } else {
        newPhaseState = {
          ...newPhaseState,
          [action.prop]: action.val,
        }
      }

      return {
        ...state,
        [state.phase]: {
          ...newPhaseState,
        },
        undoStack: addUndo(state, action),
      }

    // I really bad at naming
    // Basically sets a prop inside a phase
    // (Qualitative doesn't have tabs...)
    case "setPropInPhase":
      return {
        ...state,
        [action.phase]: {
          ...state[action.phase],
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
