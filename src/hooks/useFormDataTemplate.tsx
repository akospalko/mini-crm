
// TOOD: Pass form data with type and required value???

// Prepare and return form data templates
import {
  PropertyTypeE,
  JobPositionsE,
  ClientFormTemplateI,
  InputFieldTypesE,
  PropertyFormTemplateI,
} from "../types/types";
import useProperty from "./useProperty";
import { TransformedFormFieldI } from "../types/types";
import useClients from "./useClients";

const useFormDataTemplate = () => {
  // CONTEXT
  const { property } = useProperty();
  const { clients, activeClient } = useClients();

  // TODO: utilize activeClient's properties instead of property???

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
    };
  };

  // TODO: Create client
  // Client
  const getClientFormTemplate = (): ClientFormTemplateI => {
    // transform properties to form data templates
    const transformedObject: { [key: string]: TransformedFormFieldI } = {};
    property?.forEach((item) => {
      // console.log(item);
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
      };
    });

    // get positions
    const positions = Object.values(JobPositionsE);

    // template
    return {
      full_name: {
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
    };
  };

// Update client
const getUpdateClientFormTemplate = (): ClientFormTemplateI => {

  // TODO: transformed client props
  const transformedClientProperties = {};

  // get positions
  const positions = Object.values(JobPositionsE);

  return {
    full_name: {
      type: InputFieldTypesE.text,
      label: "Full name",
      value: !!activeClient.full_name ? activeClient.full_name : "",
      required: true,
    },
    address: {
      type: InputFieldTypesE.text,
      label: "Address",
      value: !!activeClient.address ? activeClient.address : "",
      required: true,
    },
    phone: {
      type: InputFieldTypesE.text,
      label: "Phone",
      value: !!activeClient.phone ? activeClient.phone : "",
      required: true,
    },
    note: {
      type: InputFieldTypesE.textarea,
      label: "Note",
      value: !!activeClient.note ? activeClient.note : "",
      required: true,
    },
    position: {
      type: InputFieldTypesE.dropdown,
      label: "Position",
      options: positions,
      value: !!activeClient.position ? activeClient.position : positions[0],
      required: false,
    },
    
    // TODO: transformed client props...
    ...transformedClientProperties,
  };
};

  return { getClientFormTemplate, getPropertyFormTemplate, getUpdateClientFormTemplate };
};

export default useFormDataTemplate;