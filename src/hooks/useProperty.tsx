// Custom hook to consume ClientContext & export
import { useContext } from "react"
import PropertyContext from "../context/propertyContext"
import { UsePropertyContextType } from "../types/types"

const useProperty = (): UsePropertyContextType => {
  return useContext(PropertyContext)
}

export default useProperty
