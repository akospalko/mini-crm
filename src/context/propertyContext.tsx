// Property state logic
import { createContext, useEffect, useReducer, useMemo } from "react"
import {
  DATABASE_RESOURCES,
  REDUCER_ACTION_TYPE_PROPERTY,
} from "../types/actionTypes"
import {
  ChildrenType,
  UsePropertyContextType,
  PropertyItemI,
  PropertyStateI,
  PropertyContextReducerActionI,
} from "../types/types"
import useFetchData from "./useFetchData"
import text from "../data/text.json"

// REDUCER
const reducer = (
  state: PropertyStateI,
  action: PropertyContextReducerActionI
): PropertyStateI => {
  // Errors
  const errorActionPayloadMissing = (
    textMessage: REDUCER_ACTION_TYPE_PROPERTY
  ): Error => new Error(`${"error-action-payload-missing"} ${textMessage}`)
  const errorUnknownActionType: Error = new Error(
    text["error-unknown-action-type"]
  )

  // Get active action
  switch (action.type) {
    // CREATE PROPERTY (single)
    case REDUCER_ACTION_TYPE_PROPERTY.CREATE_PROPERTY:
      if (!action.payload || !("property" in action.payload)) {
        throw errorActionPayloadMissing(action.type)
      }
      return { ...state, property: action.payload.property }
    // UPDATE PROPERTY
    case REDUCER_ACTION_TYPE_PROPERTY.UPDATE_PROPERTY:
      if (!action.payload || !("property" in action.payload)) {
        throw errorActionPayloadMissing(action.type)
      }
      return { ...state, property: action.payload.property }
    // UPDATE ACTIVE PROPERTY
    case REDUCER_ACTION_TYPE_PROPERTY.UPDATE_ACTIVE_PROPERTY:
      if (!action.payload || !("activeProperty" in action.payload)) {
        throw errorActionPayloadMissing(action.type)
      }
      return { ...state, activeProperty: action.payload.activeProperty }
    // DELETE PROPERTY (single)
    case REDUCER_ACTION_TYPE_PROPERTY.DELETE_PROPERTY:
      if (!action.payload || !("property" in action.payload)) {
        throw errorActionPayloadMissing(action.type)
      }
      return { ...state, property: action.payload.property }
    // DEFAULT
    default: {
      throw errorUnknownActionType
    }
  }
}

// ----------CLIENT CONTEXT LOGIC----------
// Init state
const initPropertyState: PropertyStateI = {
  newProperty: {} as PropertyItemI,
  property: [],
  activeProperty: {} as PropertyItemI,
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePropertyContext = (initPropertyState: PropertyStateI) => {
  // REDUCER
  const [state, dispatch] = useReducer(reducer, initPropertyState)

  // MEMO
  const REDUCER_ACTIONS_PROPERTY = useMemo(() => {
    return REDUCER_ACTION_TYPE_PROPERTY
  }, [])

  // HOOK
  // Fetch data
  const { data } = useFetchData(DATABASE_RESOURCES.PROPERTIES)

  // EFFECTS
  // Store fetched data
  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPE_PROPERTY.UPDATE_PROPERTY,
      payload: { property: data as PropertyItemI[] },
    })
  }, [data])

  return {
    dispatch,
    REDUCER_ACTIONS_PROPERTY,
    property: state.property,
    activeProperty: state.activeProperty,
  }
}

// ----------CREATE CONTEXT----------
// State init
const initContextState: UsePropertyContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS_PROPERTY: REDUCER_ACTION_TYPE_PROPERTY,
  property: [],
  activeProperty: {} as PropertyItemI,
}

// Create context
const PropertyContext = createContext<UsePropertyContextType>(initContextState)
// ----------CREATE PROVIDER----------
export const PropertyProvider = ({ children }: ChildrenType) => {
  return (
    <PropertyContext.Provider value={usePropertyContext(initPropertyState)}>
      {children}
    </PropertyContext.Provider>
  )
}

export default PropertyContext
