// Store app related types, interfaces, enums
import { ReactNode } from "react"
import { useClientContext } from "../context/clientContext"
import { useFormContext } from "../context/formContext"
import { usePropertyContext } from "../context/propertyContext"
import { useToggleMenuContext } from "../context/toggleMenuContext"
import { REDUCER_ACTION_TYPE_CLIENT } from "./actionTypes"
import {
  ACTIVE_MENU_ACTION_TYPE,
  REDUCER_ACTION_TYPE_PROPERTY,
  ACTIVE_MANAGEMENT,
} from "./actionTypes"

// CLIENT & PROPERTY
// Property
export enum PropertyTypeE {
  text = "text",
  date = "date",
  checkbox = "checkbox",
}

export interface PropertyItemI {
  id: string
  label: string
  type: PropertyTypeE
  required: boolean
}

// Property item type as an obj of objs
export type PropertyItemRemappedT = Omit<PropertyItemI, "id">

// Client
export enum JobPositionsE {
  CEO = "CEO",
  CTO = "CTO",
  COO = "COO",
  Manager = "Manager",
  Developer = "Developer",
}

export interface ClientPropertyI {
  id: string // property item id
  value: string | boolean
}

export interface ClientItemI {
  id: string
  "full name": string
  address: string
  phone: string
  note: string
  position: JobPositionsE
  properties: ClientPropertyI[]
}

export type ClientKeys = keyof ClientItemI

// FORM & INPUT & TEMPLATES
// Input
export enum InputFieldTypesE {
  text = "text",
  date = "date",
  checkbox = "checkbox",
  dropdown = "dropdown",
  textarea = "textarea",
}

// Form
export interface DefaultFormFieldI {
  type: InputFieldTypesE
  label: string
  value: string
  required: boolean
}

export interface DropdownFormFieldI {
  type: InputFieldTypesE
  label: string
  value: JobPositionsE
  options: JobPositionsE[]
  required: boolean
}

export interface TransformedFormFieldI {
  type: PropertyTypeE
  label: string
  required: boolean
  value: string | boolean
}

// Form template: client
export interface ClientFormTemplateI {
  [key: string]: DefaultFormFieldI | DropdownFormFieldI | TransformedFormFieldI
  "full name": DefaultFormFieldI
  address: DefaultFormFieldI
  phone: DefaultFormFieldI
  note: DefaultFormFieldI
  position: DropdownFormFieldI
}

// Form template: property
export interface PropertyLabelFieldI {
  label: string
  type: InputFieldTypesE.text
  value: string
  required: boolean
}

export interface PropertyTypeFieldI {
  label: string
  type: InputFieldTypesE.dropdown
  value: PropertyTypeE
  options: PropertyTypeE[]
  required: boolean
}

export interface PropertyRequiredFieldI {
  label: string
  type: InputFieldTypesE.checkbox
  value: boolean
  required: boolean
}

export interface PropertyFormTemplateI {
  [key: string]:
    | PropertyLabelFieldI
    | PropertyTypeFieldI
    | PropertyRequiredFieldI
  label: PropertyLabelFieldI
  type: PropertyTypeFieldI
  required: PropertyRequiredFieldI
}

export interface PopulateFormDataWithActiveClientI {
  id?: string
  "full name"?: string
  address?: string
  phone?: string
  note?: string
  position?: JobPositionsE
  properties?: ClientPropertyI[]
  [key: string]:
    | string
    | JobPositionsE
    | ClientPropertyI[]
    | boolean
    | undefined
}

export enum ClientFormDataE {
  "full name" = "full name",
  "address" = "address",
  "phone" = "phone",
  "note" = "note",
  "position" = "position",
}

// CONTEXT
export type UseClientContextType = ReturnType<typeof useClientContext>
export type UsePropertyContextType = ReturnType<typeof usePropertyContext>
export type UseToggleMenuContextType = ReturnType<typeof useToggleMenuContext>
export type UseFormContextType = ReturnType<typeof useFormContext>

// clientContext.tsx
export interface ClientStateI {
  newClient: ClientItemI
  clients: ClientItemI[]
  filteredClients: ClientItemI[]
  activeClient: ClientItemI
}

export interface ClientContextReducerActionI {
  type: REDUCER_ACTION_TYPE_CLIENT
  payload:
    | { newClient: ClientItemI }
    | { clients: ClientItemI[] }
    | { filteredClients: ClientItemI[] }
    | { activeClient: ClientItemI }
}

// propertyContext.tsx
export interface PropertyStateI {
  newProperty: PropertyItemI
  property: PropertyItemI[]
  activeProperty: PropertyItemI
}

export interface PropertyContextReducerActionI {
  type: REDUCER_ACTION_TYPE_PROPERTY
  payload:
    | { newProperty: PropertyItemI }
    | { property: PropertyItemI[] }
    | { activeProperty: PropertyItemI }
}

// toggleMenuContext.tsx
export interface UseToggleMenuContextI {
  isToggled: boolean
  menuContent: ACTIVE_MENU_ACTION_TYPE | "default"
  toggleModal: (forcedValue: boolean) => void
  menuContentChangeHandler: (activeContent: ACTIVE_MENU_ACTION_TYPE) => void
}

// formContext.tsx
export interface UseFormContextI {
  formData: ClientFormTemplateI | PropertyFormTemplateI
  setFormData: React.Dispatch<
    React.SetStateAction<ClientFormTemplateI | PropertyFormTemplateI>
  >
}

// COMPONENT PROPS
// ClientList.tsx
export interface ClientListPropsI {
  data: ClientItemI[]
}

// ClientCard.tsx
export interface ClientCardPropsI {
  clientData: ClientItemI
}

// EmptyList.tsx
export interface EmptyListIProps {
  content?: string
}

// Management.tsx
export interface ManagementIProps {
  data: ClientItemI[] | PropertyItemI[]
  activeManagementTab: ACTIVE_MANAGEMENT
}

// MangementItem.tsx
export interface ClientManagementPropsI {
  itemData: ClientItemI | PropertyItemI
  activeManagement: ACTIVE_MANAGEMENT
}

// Checkbox.tsx
export interface CheckboxPropsI {
  name: string
  label?: string
  checkValue: boolean
  readOnly?: boolean
  required: boolean
}

// CreateItemButton.tsx
export interface CreateItemButtonPropsI {
  title: string
  changed: () => void
}

// DatePicker.tsx
export interface DateInputProps {
  value: string
  name: string
  label: string
  required: boolean
}

// Dropdown.tsx
export interface DropdownProps {
  name: string
  label: string
  options: JobPositionsE[]
  value: JobPositionsE
}

// Form.tsx
export interface FormPropsI {
  action: ACTIVE_MENU_ACTION_TYPE
}

// InputText.tsx
export interface InputTextPropsI {
  name: string
  type: InputFieldTypesE.text | InputFieldTypesE.textarea
  label: string
  value: string
  required: boolean
}

// Label.tsx
export interface LabelPropsI {
  content: string
  elemTitle: string
}

// ManagementItemButton.tsx
export interface ManagementItemButtonPropsI {
  children: ReactNode
  clicked: () => void
  title: string
  dataAction: string
}

// MultiTypeInput.tsx
export interface MultiTypeInputPropsI {
  name: string
  type: InputFieldTypesE | PropertyTypeE
  label: string
  value: string | boolean | JobPositionsE
  options: JobPositionsE[]
  required: boolean
}

// MISC
// Children
export interface ChildrenI {
  children?: React.ReactElement | React.ReactElement[]
}
