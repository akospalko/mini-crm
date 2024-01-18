// Custom hook to consume ClientContext & export
import {useContext} from "react";
import ClientsContext from "../context/clientContext";
import {UseClientContextType} from "../types/types";

const useClients = (): UseClientContextType => {
  return useContext(ClientsContext);
}

export default useClients;