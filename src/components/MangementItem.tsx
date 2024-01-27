// Client item for management page
import useClients from "../hooks/useClients"
import useForm from "../hooks/useForm"
import useFormDataTemplate from "../hooks/useFormDataTemplate"
import useToggleMenu from "../hooks/useToggleMenu"
import useProperty from "../hooks/useProperty"
import {
  ACTIVE_MANAGEMENT,
  ACTIVE_MENU_ACTION_TYPE,
  DATABASE_RESOURCES,
} from "../types/actionTypes"
import {
  ClientItemI,
  PopulateFormDataWithActiveClientI,
  PropertyItemI,
} from "../types/types"
import {
  deleteItemByID,
  findActiveArrayItem,
  populateFormWithActiveData,
} from "../utility/misc"
import ManagementItemButton from "./UI/ManagementItemButton"
import { DeleteIcon, EditIcon } from "./UI/SVG"
import dataAction from "../data/data_test_id.json"
import testID from "../data/data_test_id.json"
import text from "../data/text.json"

// INTERFACE
interface ClientManagementI {
  itemData: ClientItemI | PropertyItemI
  activeManagement: ACTIVE_MANAGEMENT
}

const MangementItem = ({ itemData, activeManagement }: ClientManagementI) => {
  // CONTEXT
  const {
    clients,
    dispatch: dispatchClients,
    REDUCER_ACTIONS_CLIENT,
  } = useClients()
  const {
    property,
    dispatch: dispatchProperty,
    REDUCER_ACTIONS_PROPERTY,
  } = useProperty()
  const { toggleModal, menuContentChangeHandler } = useToggleMenu()
  const { setFormData } = useForm()

  // HOOK
  const { getClientFormTemplate, getPropertyFormTemplate } =
    useFormDataTemplate()

  // UTIL
  // Remap activeClients nested "properties" entries -> make form compatible
  const getActiveClientWithRemappedProperties = (
    activeClientData: ClientItemI
  ): PopulateFormDataWithActiveClientI => {
    if (!activeClientData) {
      return {}
    }

    const updatedActiveClient: PopulateFormDataWithActiveClientI = {
      ...activeClientData,
    }

    if (activeClientData.properties && activeClientData.properties.length > 0) {
      activeClientData.properties.forEach((property) => {
        if (property.id) {
          updatedActiveClient[property.id] = property.value
        }
      })

      // remove "properties" entry
      delete updatedActiveClient.properties
    }

    return updatedActiveClient
  }

  // HANDLERS
  // Delete client and property item
  const deleteItemHandler = (isClientAction: boolean): void => {
    // check for provided arguments
    if (
      isClientAction === undefined ||
      isClientAction === null ||
      typeof isClientAction !== "boolean"
    ) {
      throw new Error(`${text["error-invalid-argument"]} ${isClientAction}`)
    }

    // delete item from array
    const updatedItemsArray: ClientItemI[] | PropertyItemI[] = deleteItemByID(
      itemData.id,
      isClientAction ? clients : property
    )

    // update state using the chosen dispatch function
    isClientAction
      ? dispatchClients({
          type: REDUCER_ACTIONS_CLIENT.DELETE_CLIENT,
          payload: { clients: updatedItemsArray as ClientItemI[] },
        })
      : dispatchProperty({
          type: REDUCER_ACTIONS_PROPERTY.DELETE_PROPERTY,
          payload: { property: updatedItemsArray as PropertyItemI[] },
        })

    // update ls
    localStorage.setItem(
      isClientAction
        ? DATABASE_RESOURCES.CLIENTS
        : DATABASE_RESOURCES.PROPERTIES,
      JSON.stringify(updatedItemsArray)
    )
  }

  // Edit/update client and property item
  const editItemHandler = (isClientAction: boolean) => {
    // check for provided arguments
    if (
      isClientAction === undefined ||
      isClientAction === null ||
      typeof isClientAction !== "boolean"
    ) {
      throw new Error(`${text["error-invalid-argument"]} ${isClientAction}`)
    }

    // set up active menu content
    menuContentChangeHandler(
      isClientAction
        ? ACTIVE_MENU_ACTION_TYPE.EDIT_CLIENT
        : ACTIVE_MENU_ACTION_TYPE.EDIT_PROPERTY
    )

    // find activec item
    const activeItem: ClientItemI | PropertyItemI = findActiveArrayItem(
      itemData.id,
      isClientAction ? clients : property
    )

    // update state
    isClientAction
      ? dispatchClients({
          type: REDUCER_ACTIONS_CLIENT.UPDATE_ACTIVE_CLIENT,
          payload: { activeClient: activeItem as ClientItemI },
        })
      : dispatchProperty({
          type: REDUCER_ACTIONS_PROPERTY.UPDATE_ACTIVE_PROPERTY,
          payload: { activeProperty: activeItem as PropertyItemI },
        })

    // process active item: client -> assign properties to form, property -> same as activeItem
    const activeItemProcessed:
      | PopulateFormDataWithActiveClientI
      | PropertyItemI = isClientAction
      ? getActiveClientWithRemappedProperties(activeItem as ClientItemI)
      : (activeItem as PropertyItemI)

    // populate form
    const populatedForm = populateFormWithActiveData(
      activeItemProcessed,
      isClientAction ? getClientFormTemplate() : getPropertyFormTemplate()
    )

    // update form state with populated data
    setFormData(populatedForm)

    // open modal
    toggleModal(true)
  }

  // STYLE
  const iconSize: string = "25px"
  const iconColor: string = "var(--color_1)"
  const contentStyle: string = "my-auto truncate"

  // LAYOUT
  // Get active content
  let activeEditItemHandler = () => {}
  let activeDeleteItemHandler = () => {}
  const clientItemData: ClientItemI = itemData as ClientItemI
  const propertyItemData: PropertyItemI = itemData as PropertyItemI

  let itemContent
  switch (activeManagement) {
    case ACTIVE_MANAGEMENT.CLIENT_MANAGEMENT:
      activeEditItemHandler = () => editItemHandler(true)
      activeDeleteItemHandler = () => deleteItemHandler(true)
      itemContent = (
        <>
          <span
            title={clientItemData["full name"]}
            className={`${contentStyle} mr-5`}
          >
            {clientItemData["full name"]}
          </span>
          <span title={clientItemData["position"]} className={contentStyle}>
            {clientItemData["position"]}
          </span>
        </>
      )
      break
    case ACTIVE_MANAGEMENT.PROPERTY_MANAGEMENT:
      activeEditItemHandler = () => editItemHandler(false)
      activeDeleteItemHandler = () => deleteItemHandler(false)
      itemContent = (
        <>
          <span
            title={propertyItemData.label}
            className={`${contentStyle} mr-5`}
          >
            {propertyItemData.label}
          </span>
          <span title={propertyItemData.type} className={contentStyle}>
            {propertyItemData.type}
          </span>
        </>
      )
      break
    default:
      throw new Error(`text["error-unknown-action-type"] ${activeManagement}`)
  }

  return (
    <div
      data-testid={testID["management-client-item"]}
      className="grid h-[56px] grid-flow-col grid-cols-[150px,1fr,40px,40px] grid-rows-1 gap-[0.5rem] overflow-hidden rounded bg-color_2 p-[0.5rem] focus-within:outline-2 lg:grid-cols-[200px,1fr,40px,40px]"
    >
      {itemContent}
      <ManagementItemButton
        title={text["title-edit"]}
        dataAction={dataAction["data-action-edit"]}
        changed={activeEditItemHandler}
      >
        <EditIcon width={iconSize} height={iconSize} fill={iconColor} />
      </ManagementItemButton>
      <ManagementItemButton
        title={text["title-delete"]}
        dataAction={dataAction["data-action-delete"]}
        changed={activeDeleteItemHandler}
      >
        <DeleteIcon width={iconSize} height={iconSize} fill={iconColor} />
      </ManagementItemButton>
    </div>
  )
}

export default MangementItem
