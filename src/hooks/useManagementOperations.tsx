// Submit form handlers with logic
import { nanoid } from "nanoid";
import useForm from "./useForm";
import useClients from "./useClients";
import useProperty from "./useProperty";
import {
  ClientFormDataE,
  ClientItemI,
  ClientItemCreateI,
  ClientKeys,
  JobPositionsE,
  PropertyItemI,
  PropertyTypeE,
  ClientItemCreateWithoutPropertiesI,
  ClientItemCreatePropertiesI,
} from "../types/types";
import { updateDataArray } from "../utility/misc";
import { DATABASE_RESOURCES } from "../types/actionTypes";

const useFormHandlers = () => {
  // CONTEXTS
  const { formData } = useForm();
  const {
    clients,
    activeClient,
    dispatch: dispatchClients,
    REDUCER_ACTIONS_CLIENT,
  } = useClients();
  const {
    property,
    activeProperty,
    dispatch: dispatchProperty,
    REDUCER_ACTIONS_PROPERTY,
  } = useProperty();

  // UTIL
  // Convert input field data to request format
  // Create client - process and store data

  // TODO: Rename fn, to sth resembling the processing of data.
  // TODO: Create proper return , etc types

  // CREATE CLIENT - PROCESS CLIENT DATA
  const createNewClient = (): ClientItemCreateI => {
    // TODO: HANDLE TYPING
    const extractedBasicInfo: ClientItemCreateWithoutPropertiesI =
      {} as ClientItemCreateWithoutPropertiesI;
    const extractedProperties: ClientItemCreatePropertiesI[] = []; // Change to array

    for (const key in formData) {
      const { value } = formData[key];
      if (Object.values(ClientFormDataE).includes(key as ClientFormDataE)) {
        extractedBasicInfo[key] = value;
      } else if (key.startsWith("p-")) {
        extractedProperties.push({ [key]: value });
      }
    }

    const processedClientData: ClientItemCreateI = {
      ...extractedBasicInfo,
      properties: extractedProperties,
    };

    return processedClientData;
  };
  /*
    {
      "label": "provided phone number",
      "type": "boolean", 
      "required": false
    }
  */

  // CREATE PROPERTY - PROCESS PROPERTY DATA
  const createNewProperty = () => {
    // TODO: Pass proper type
    const extractedData = {};

    for (const key in formData) {
      const obj = formData[key];
      extractedData[key] = obj.value;
    }

    console.log(extractedData);
    return extractedData;
  };

  // Updating existing client
  const updateExistingClient = () => {
    // TODO:...
  };

  // Update existing property
  const updateExistingProperty = () => {
    // TODO:...
    console.log(formData);
    const extractedData = {};

    for (const key in formData) {
      const obj = formData[key];
      extractedData[key] = obj.value;
    }

    return extractedData;
  };

  return {
    createNewClient,
    createNewProperty,
    updateExistingClient,
    updateExistingProperty,
  };
};

export default useFormHandlers;
