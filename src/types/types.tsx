import { useClientContext } from "../context/clientContext";
import { useFormContext } from "../context/formContext";
import { usePropertyContext } from "../context/propertyContext";
import { useToggleMenuContext } from "../context/toggleMenuContext";
import { REDUCER_ACTION_TYPE_CLIENT } from "./actionTypes";
import { ACTIVE_MENU_ACTION_TYPE, REDUCER_ACTION_TYPE_PROPERTY} from "./actionTypes";

// Collection of app related types, interfaces, enums
// Property
export enum PropertyTypeE {
  text = "text", 
  date = "date",
  checkbox = "checkbox" 
}

export interface PropertyItemI {
  "id": string,
  "label": string,
  "type": PropertyTypeE
  "required": boolean  
}

// Property item type as an obj of objs
export type PropertyItemRemappedT = Omit<PropertyItemI, 'id'>;

// Client
export enum JobPositionsE {
  CEO = "CEO", 
  CTO = "CTO", 
  COO = "COO",
  Manager = "Manager",
  Developer = "Developer",
}

export interface ClientPropertyI {
  id: string, // property item id
  value: string | boolean
}

export interface ClientItemI {
  "id": string,
  "full name": string,
  "address": string,
  "phone": string,
  "note": string,
  "position": JobPositionsE,
  "properties": ClientPropertyI[],
} 

export type ClientKeys = keyof ClientItemI;

export interface PopulateFormDataWithActiveClientI {
  id?: string;
  "full name"?: string;
  address?: string;
  phone?: string;
  note?: string;
  position?: JobPositionsE;
  properties?: ClientPropertyI[];
  [key: string]: string | JobPositionsE | ClientPropertyI[] | boolean | undefined;
} 

export interface ClientWithoutIdAndPropertiesI
  extends Omit<ClientItemI, "id" | "properties"> {}

export enum ClientFormDataE {
  "full name" = "full name",
  "address" = "address",
  "phone" = "phone",
  "note" = "note",
  "position" = "position",
} 

// clientContext.tsx
export interface ClientStateI {
  newClient: ClientItemI
  clients: ClientItemI[],
  filteredClients: ClientItemI[],
  activeClient: ClientItemI
}

export interface ClientContextReducerActionI {
  type: REDUCER_ACTION_TYPE_CLIENT;
  payload:
    | { newClient: ClientItemI } 
    | { clients: ClientItemI[] } 
    | { filteredClients: ClientItemI[] } 
    | { activeClient: ClientItemI }; 
}

// propertyContext.tsx 
export interface PropertyStateI {
  newProperty: PropertyItemI,
  property: PropertyItemI[],
  activeProperty: PropertyItemI
}

export interface PropertyContextReducerActionI {
  type: REDUCER_ACTION_TYPE_PROPERTY,
  payload:
  | { newProperty: PropertyItemI } 
  | { property: PropertyItemI[] } 
  | { activeProperty: PropertyItemI}; 
}

export interface ChildrenType {children?: React.ReactElement | React.ReactElement[]}
export type UseClientContextType = ReturnType<typeof useClientContext>
export type UsePropertyContextType = ReturnType<typeof usePropertyContext>
export type UseFormContextType = ReturnType<typeof useFormContext>
export type UseToggleMenuContextType = ReturnType<typeof useToggleMenuContext>

// ClientCard.tsx
export interface ClientCardPropsI {
  clientData: ClientItemI
}

// toggleMenuContext.tsx
export interface UseToggleMenuContextI {
  isToggled: boolean,
  menuContent: ACTIVE_MENU_ACTION_TYPE | "default",
  toggleModal: (forcedValue: boolean) => void,
  menuContentChangeHandler: (activeContent: ACTIVE_MENU_ACTION_TYPE | "default") => void
}

// Form.tsx, form templates
export interface DefaultFormFieldI {
  type: InputFieldTypesE,
  label: string,
  value: string,
  required: boolean
}

export interface DropdownFormFieldI {
  type: InputFieldTypesE,
  label: string,
  value: JobPositionsE,
  options: JobPositionsE[],
  required: boolean
}

export interface TransformedFormFieldI {
  type: PropertyTypeE
  label: string,
  required: boolean,
  value: string | boolean
}

export interface ClientFormTemplateI {
  [key: string]: DefaultFormFieldI | DropdownFormFieldI | TransformedFormFieldI,
  "full name": DefaultFormFieldI,
  "address": DefaultFormFieldI,
  "phone": DefaultFormFieldI,
  "note": DefaultFormFieldI,
  "position": DropdownFormFieldI
}

// useFormDataTemplate.tsx -> Property
export interface PropertyLabelFieldI {
  label: string,
  type: InputFieldTypesE.text,
  value: string,
  required: boolean
}

export interface PropertyTypeFieldI {
  label: string,
  type: InputFieldTypesE.dropdown,
  value: PropertyTypeE,
  options: PropertyTypeE[],
  required: boolean
}

export interface PropertyRequiredFieldI {
  label: string,
  type: InputFieldTypesE.checkbox,
  value: boolean,
  required: boolean
}

export interface PropertyFormTemplateI {
  [key: string]: PropertyLabelFieldI | PropertyTypeFieldI | PropertyRequiredFieldI,
  "label": PropertyLabelFieldI,
  "type": PropertyTypeFieldI,
  "required": PropertyRequiredFieldI,
}

// Input.tsx, input type types
export enum InputFieldTypesE {
  text = "text",
  date = "date",
  checkbox = "checkbox",
  dropdown = "dropdown",
  textarea = "textarea"
}