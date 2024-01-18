// Custom hook to consume ToggleMenuContext & export
import { useContext } from "react";
import FormContext from "../context/formContext";
import { UseFormContextType } from "../types/types";

const useForm = (): UseFormContextType => {
  return useContext(FormContext);
}

export default useForm;