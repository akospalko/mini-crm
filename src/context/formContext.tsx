// State to store raw form data
import { createContext, useState } from "react"
import {
  ChildrenI,
  ClientFormTemplateI,
  PropertyFormTemplateI,
  UseFormContextI,
} from "../types/types"

// ---------CONTEXT LOGIC----------
// eslint-disable-next-line react-refresh/only-export-components
export const useFormContext = () => {
  // STATE
  const [formData, setFormData] = useState<
    ClientFormTemplateI | PropertyFormTemplateI
  >({} as ClientFormTemplateI | PropertyFormTemplateI)

  return { formData, setFormData }
}

// ----------CREATE CONTEXT----------
const initContextState: UseFormContextI = {
  formData: {} as ClientFormTemplateI | PropertyFormTemplateI,
  setFormData: () => {},
}

const FormContext = createContext<UseFormContextI>(initContextState)

// ----------CREATE PROVIDER----------
export const FormProvider = ({ children }: ChildrenI) => {
  return (
    <FormContext.Provider value={useFormContext()}>
      {children}
    </FormContext.Provider>
  )
}

export default FormContext
