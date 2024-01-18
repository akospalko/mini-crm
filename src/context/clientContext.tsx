/* eslint-disable react-refresh/only-export-components */
// Client state logic 
import {createContext, useEffect, useReducer, useMemo} from "react";
import {REDUCER_ACTION_TYPE_CLIENT} from "../types/actionTypes";
import {ClientItemI, UseClientContextType, ClientContextReducerActionI, ClientStateI, ChildrenType} from "../types/types";

// REDUCER
const reducer = (state: ClientStateI, action: ClientContextReducerActionI): ClientStateI => {
  // Errors
  const actionTypeError = (textMessage: REDUCER_ACTION_TYPE_CLIENT): Error => new Error(`action payload is missing for: ${textMessage}`);
  const unknownActionTypeError: Error = new Error("Unknown action type");

  // Get active action 
  switch(action.type) {
    // CREATE CLIENT (single)
    case REDUCER_ACTION_TYPE_CLIENT.CREATE_CLIENT: 
    if (!action.payload || !("newClient" in action.payload)) {
      throw actionTypeError(action.type);
    }
    return { 
      ...state,  
      clients: state.clients ? [...state.clients, action.payload.newClient] : [action.payload.newClient]
    };
    // UPDATE CLIENTS 
    case REDUCER_ACTION_TYPE_CLIENT.UPDATE_CLIENT: 
    if (!action.payload || !("clients" in action.payload)) {
        throw actionTypeError(action.type);
      }
      return {...state, clients: action.payload.clients}
    // UPDATE FILTERED CLIENTS
    case REDUCER_ACTION_TYPE_CLIENT.UPDATE_FILTERED_CLIENTS: 
      if(!action.payload || !("filteredClients" in action.payload)) {
        throw actionTypeError(action.type);
      }
      return {...state, filteredClients: action.payload.filteredClients}
    // UPDATE ACTIVE CLIENTS
    case REDUCER_ACTION_TYPE_CLIENT.UPDATE_ACTIVE_CLIENT: 
      if(!action.payload || !("activeClient" in action.payload)) {
        throw actionTypeError(action.type);
      }
      return {...state, activeClient: action.payload.activeClient}
    // DELETE CLIENT (single)
    case REDUCER_ACTION_TYPE_CLIENT.DELETE_CLIENT: 
      if (!action.payload || !("clients" in action.payload)) {
        throw actionTypeError(action.type);
      }
      return {...state, clients: action.payload.clients}
    // DEFAULT
    default: {
      throw unknownActionTypeError;
    }
  }
}

// ----------CLIENT CONTEXT LOGIC----------
// Init state
const initClientState: ClientStateI = {
  newClient: {} as ClientItemI,
  clients: [],
  filteredClients: [],
  activeClient: {} as ClientItemI
}

export const useClientContext = (initClientState: ClientStateI) => {
  // REDUCER
  const [state, dispatch] = useReducer(reducer, initClientState);

  // MEMO
  const REDUCER_ACTIONS_CLIENT = useMemo(() => {
    return REDUCER_ACTION_TYPE_CLIENT;
  }, []) 

  // EFFECTS
  // Initial data fetch
  useEffect(() => {
    const fetchClients = async (): Promise<void> => {
      const fetchedClientData = await fetch("http://localhost:3500/clients")
        .then((res) => res.json())
        .catch((err) => {
          if (err instanceof Error) {
            throw new Error(String(err));
          }
        });
  
      // Store in state
      dispatch({
        type: REDUCER_ACTION_TYPE_CLIENT.UPDATE_CLIENT,
        payload: {clients: fetchedClientData},
      });
    };
  
    // fetch data, update state
    fetchClients();
  }, []);

  return {
    dispatch, 
    REDUCER_ACTIONS_CLIENT,
    clients: state.clients, 
    filteredClients: state.filteredClients,
    activeClient: state.activeClient
  }
}

// ----------CREATE CONTEXT----------
// State init
const initContextState: UseClientContextType = { 
  dispatch: () => {},
  REDUCER_ACTIONS_CLIENT: REDUCER_ACTION_TYPE_CLIENT,  
  clients: [],
  filteredClients: [],
  activeClient: {} as ClientItemI
}

// Create context
const ClientsContext = createContext<UseClientContextType>(initContextState);
// ----------CREATE PROVIDER----------
export const ClientsProvider = ({ children }: ChildrenType) => {

 return(
    <ClientsContext.Provider value={ useClientContext(initClientState) }>
      { children }
    </ClientsContext.Provider>
  )
}

export default ClientsContext;