// Property state logic
import { createContext, useEffect, useReducer, useMemo } from "react"
import { REDUCER_ACTION_TYPE_PROPERTY } from "../types/actionTypes"
import {
  ChildrenI,
  UsePropertyContextType,
  PropertyItemI,
  PropertyStateI,
  PropertyContextReducerActionI,
} from "../types/types"
import text from "../data/text.json"
import { getAllProperties } from "../Requests/apiRequests"
import { AxiosError } from "axios"

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

  // EFFECTS
  // Store fetched data
  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Call your getAllProperties function
        const { responseData /*, error, status */ } = await getAllProperties()
        console.log(responseData)
        dispatch({
          type: REDUCER_ACTION_TYPE_PROPERTY.UPDATE_PROPERTY,
          payload: { property: responseData as PropertyItemI[] },
        })
      } catch (error: unknown) {
        if (error instanceof Error || error instanceof AxiosError) {
          throw new Error("Unknown error occurred")
        }
      }
    }
    fetchClients()
  }, [])

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
export const PropertyProvider = ({ children }: ChildrenI) => {
  return (
    <PropertyContext.Provider value={usePropertyContext(initPropertyState)}>
      {children}
    </PropertyContext.Provider>
  )
}

export default PropertyContext
