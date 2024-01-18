// Property state logic 
import {createContext, useEffect, useReducer, useMemo} from "react";
import {REDUCER_ACTION_TYPE_PROPERTY} from "../types/actionTypes";
import {ChildrenType, UsePropertyContextType, PropertyItemI, PropertyStateI, PropertyContextReducerActionI} from "../types/types";

// REDUCER
const reducer = (state: PropertyStateI, action: PropertyContextReducerActionI): PropertyStateI => {
  // Errors
  const actionTypeError = (textMessage: REDUCER_ACTION_TYPE_PROPERTY): Error => new Error(`action payload is missing for: ${textMessage}`);
  const unknownActionTypeError: Error = new Error("Unknown action type");

  // Get active action 
  switch(action.type) {
    // CREATE PROPERTY (single)
    case REDUCER_ACTION_TYPE_PROPERTY.CREATE_PROPERTY: 
    if (!action.payload || !("newProperty" in action.payload)) {
        throw actionTypeError(action.type);
      }
      return { 
        ...state,  
        property: (state.property ?? []).concat(action.payload?.newProperty ?? [])
      };      
    // UPDATE PROPERTY 
    case REDUCER_ACTION_TYPE_PROPERTY.UPDATE_PROPERTY: 
      if (!action.payload || !("property" in action.payload)) {
        throw actionTypeError(action.type);
      }
      return {...state, property: action.payload.property}
    // UPDATE ACTIVE PROPERTY
    case REDUCER_ACTION_TYPE_PROPERTY.UPDATE_ACTIVE_PROPERTY: 
    if (!action.payload || !("activeProperty" in action.payload)) {
        throw actionTypeError(action.type);
      }
      return {...state, activeProperty: action.payload.activeProperty}
    // DELETE PROPERTY (single)
    case REDUCER_ACTION_TYPE_PROPERTY.DELETE_PROPERTY: 
      if (!action.payload || !("property" in action.payload)) {
        throw actionTypeError(action.type);
      }
      return {...state, property: action.payload.property}
    // DEFAULT
    default: {
      throw unknownActionTypeError;
    }
  }
}

// ----------CLIENT CONTEXT LOGIC----------
// Init state
const initPropertyState: PropertyStateI = {
  newProperty: {} as PropertyItemI,
  property: [],
  activeProperty: {} as PropertyItemI
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePropertyContext = (initPropertyState: PropertyStateI) => {
  // REDUCER
  const [state, dispatch] = useReducer(reducer, initPropertyState);

  // MEMO
  const REDUCER_ACTIONS_PROPERTY = useMemo(()=> {
    return REDUCER_ACTION_TYPE_PROPERTY;
  }, []) 

  // EFFECTS
  useEffect(() => {
    const fetchClients = async (): Promise<void> => {
      const fetchedClientData = await fetch("http://localhost:3500/properties")
        .then((res) => res.json())
        .catch((err) => {
          if (err instanceof Error) {
            throw new Error(String(err));
          }
        });

      // Store in state
      dispatch({
        type: REDUCER_ACTION_TYPE_PROPERTY.UPDATE_PROPERTY,
        payload: {property: fetchedClientData},
      });
    };

    // fetch data, update state
    fetchClients();
  }, []);

  return {
    dispatch, 
    REDUCER_ACTIONS_PROPERTY,  
    property: state.property, 
    activeProperty: state.activeProperty
  }
}

// ----------CREATE CONTEXT----------
// State init
const initContextState: UsePropertyContextType = { 
  dispatch: () => {},
  REDUCER_ACTIONS_PROPERTY: REDUCER_ACTION_TYPE_PROPERTY,  
  property: [],
  activeProperty: {} as PropertyItemI
}

// Create context
const PropertyContext = createContext<UsePropertyContextType>(initContextState);
// ----------CREATE PROVIDER----------
export const PropertyProvider = ({ children }: ChildrenType) => {

 return(
    <PropertyContext.Provider value={ usePropertyContext(initPropertyState) }>
      { children }
    </PropertyContext.Provider>
  )
}

export default PropertyContext;