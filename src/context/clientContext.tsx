/* eslint-disable react-refresh/only-export-components */
// Client state logic 
import {createContext, useEffect, useReducer, useMemo} from "react";
import {DATABASE_RESOURCES, REDUCER_ACTION_TYPE_CLIENT} from "../types/actionTypes";
import {ClientItemI, UseClientContextType, ClientContextReducerActionI, ClientStateI, ChildrenType} from "../types/types";
import useFetchData from "./useFetchData";
import text from "../data/text.json";

// REDUCER
const reducer = (state: ClientStateI, action: ClientContextReducerActionI): ClientStateI => {
  // Errors
  const errorActionPayloadMissing = (textMessage: REDUCER_ACTION_TYPE_CLIENT): Error => new Error(`${"error-action-payload-missing"} ${textMessage}`);
  const errorUnknownActionType: Error = new Error(text["error-unknown-action-type"]);

  // Get active action 
  switch(action.type) {
    // CREATE CLIENT (single)
    case REDUCER_ACTION_TYPE_CLIENT.CREATE_CLIENT: 
      if (!action.payload || !("clients" in action.payload)) {
        throw errorActionPayloadMissing(action.type);
      }
      return {...state, clients: action.payload.clients}
    // UPDATE CLIENTS 
    case REDUCER_ACTION_TYPE_CLIENT.UPDATE_CLIENT: 
    if (!action.payload || !("clients" in action.payload)) {
        throw errorActionPayloadMissing(action.type);
      }
      return {...state, clients: action.payload.clients}
    // UPDATE FILTERED CLIENTS
    case REDUCER_ACTION_TYPE_CLIENT.UPDATE_FILTERED_CLIENTS: 
      if(!action.payload || !("filteredClients" in action.payload)) {
        throw errorActionPayloadMissing(action.type);
      }
      return {...state, filteredClients: action.payload.filteredClients}
    // UPDATE ACTIVE CLIENTS
    case REDUCER_ACTION_TYPE_CLIENT.UPDATE_ACTIVE_CLIENT: 
      if(!action.payload || !("activeClient" in action.payload)) {
        throw errorActionPayloadMissing(action.type);
      }
      return {...state, activeClient: action.payload.activeClient}
    // DELETE CLIENT (single)
    case REDUCER_ACTION_TYPE_CLIENT.DELETE_CLIENT: 
      if (!action.payload || !("clients" in action.payload)) {
        throw errorActionPayloadMissing(action.type);
      }
      return {...state, clients: action.payload.clients}
    // DEFAULT
    default: {
      throw errorUnknownActionType;
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

  // HOOK
  // Fetch data
  const {data} = useFetchData(DATABASE_RESOURCES.CLIENTS);

  // EFFECTS
  // Store fetched data
  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPE_CLIENT.UPDATE_CLIENT,
      payload: {clients: data as ClientItemI[]},
    });
  }, [data]);

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