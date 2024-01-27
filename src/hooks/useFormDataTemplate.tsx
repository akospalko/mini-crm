// Prepare and return form data templates
import {
  PropertyTypeE,
  JobPositionsE,
  ClientFormTemplateI,
  InputFieldTypesE,
  PropertyFormTemplateI,
} from "../types/types"
import useProperty from "./useProperty"
import { TransformedFormFieldI } from "../types/types"

const useFormDataTemplate = () => {
  // CONTEXT
  const { property } = useProperty()

  // TEMPLATES
  // Property
  const getPropertyFormTemplate = (): PropertyFormTemplateI => {
    // template
    return {
      label: {
        label: "Label",
        type: InputFieldTypesE.text,
        value: "",
        required: true,
      },
      type: {
        label: "Type",
        type: InputFieldTypesE.dropdown,
        value: PropertyTypeE.text,
        options: Object.values(PropertyTypeE),
        required: false,
      },
      required: {
        label: "Required field",
        type: InputFieldTypesE.checkbox,
        value: false,
        required: false,
      },
    }
  }

  // Client
  const getClientFormTemplate = (): ClientFormTemplateI => {
    // transform properties to form data templates
    const transformedObject: { [key: string]: TransformedFormFieldI } = {}
    property?.forEach((item) => {
      transformedObject[item.id] = {
        label: item.label,
        type: item.type,
        required: item.required,
        value:
          item.type === PropertyTypeE.checkbox
            ? item.required
              ? true
              : false
            : "",
      }
    })

    // get positions
    const positions = Object.values(JobPositionsE)

    // template
    return {
      "full name": {
        type: InputFieldTypesE.text,
        label: "Full name",
        value: "",
        required: true,
      },
      address: {
        type: InputFieldTypesE.text,
        label: "Address",
        value: "",
        required: true,
      },
      phone: {
        type: InputFieldTypesE.text,
        label: "Phone",
        value: "",
        required: true,
      },
      note: {
        type: InputFieldTypesE.textarea,
        label: "Note",
        value: "",
        required: true,
      },
      position: {
        type: InputFieldTypesE.dropdown,
        label: "Position",
        options: positions,
        value: positions[0],
        required: false,
      },
      ...transformedObject,
    }
  }

  return { getClientFormTemplate, getPropertyFormTemplate }
}

export default useFormDataTemplate
