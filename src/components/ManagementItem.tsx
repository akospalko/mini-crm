// Management page client and property pg
// TODO: Fix types
// TODO: throw error instead of console log
import useClients from "../hooks/useClients";
import useForm from "../hooks/useForm";
import useToggleMenu from "../hooks/useToggleMenu";
import useProperty from "../hooks/useProperty";
import {
  ACTIVE_MANAGEMENT,
  ACTIVE_MENU_ACTION_TYPE,
  REDUCER_ACTION_TYPE_CLIENT,
  REDUCER_ACTION_TYPE_PROPERTY,
} from "../types/actionTypes";
import {
  ClientItemI,
  PropertyItemI,
  ClientManagementPropsI,
} from "../types/types";
import ManagementItemButton from "./UI/ManagementItemButton";
import { DeleteIcon, EditIcon } from "./UI/SVG";
import dataAction from "../data/data_test_id.json";
import testID from "../data/data_test_id.json";
import text from "../data/text.json";
import {
  deleteClient,
  deleteProperty,
  getAllClients,
  getAllProperties,
  getClientById, 
  getPropertyById, 
  getEditClientTemplate,
  getEditPropertyTemplate
} from "../Requests/apiRequests";

const ManagementItem = (
  {
    itemData,
    activeManagement,
  }: ClientManagementPropsI) => {

  // CONTEXTS
  const { dispatch: dispatchClient, REDUCER_ACTIONS_CLIENT } = useClients();
  const { dispatch: dispatchProperty, REDUCER_ACTIONS_PROPERTY } = useProperty();
  const { toggleModal, menuContentChangeHandler, setupMenuHandler } = useToggleMenu();
  const { setFormData } = useForm();
  
  // HANDLERS
  // Delete client
  const deleteClientHandler = async (id: string): Promise<void> => {
    try {
      if (!id || typeof id !== "string") {
        throw new Error(`Invalid id: ${id}`);
      }
      if (id.charAt(0) !== "c") {
        throw new Error(`Wrong id type: ${id}`);
      }
      await deleteClient(id);
      const { responseData } = await getAllClients();
      dispatchClient({
        type: REDUCER_ACTION_TYPE_CLIENT.UPDATE_CLIENT,
        payload: { clients: responseData as ClientItemI[] },
      });
    } catch (err) {
      throw new Error(`Error while deleting item: ${err}`);
    }
  };

  // Delete property
  const deletePropertyHandler = async (id: string): Promise<void> => {
    try {
      if (!id || typeof id !== "string") {
        throw new Error(`Invalid id: ${id}`);
      }
      if (id.charAt(0) !== "p") {
        throw new Error(`Wrong id type: ${id}`);
      }
      await deleteProperty(id);
      const { responseData } = await getAllProperties();
      dispatchProperty({
        type: REDUCER_ACTION_TYPE_PROPERTY.UPDATE_PROPERTY,
        payload: { property: responseData as PropertyItemI[] },
      });
    } catch (err) {
      throw new Error(`Error while deleting item: ${err}`);
    }
  };

  const openEditClientMenuHandler = async (id: string): Promise<void> => {
    // NOTE: By storing active client as context state we can access its id in submit form handler
    // TODO: empty activeClient state after menu close -> {}
    const response = await getClientById(id);
    const { responseData: activeClient } = response;
    dispatchClient({
      type: REDUCER_ACTIONS_CLIENT.UPDATE_ACTIVE_CLIENT,
      payload: { activeClient: activeClient as ClientItemI },
    });

    const { responseData: editClientFormTemplate } = await getEditClientTemplate(id);

    menuContentChangeHandler(ACTIVE_MENU_ACTION_TYPE.EDIT_CLIENT);
    setupMenuHandler (
      editClientFormTemplate,
      ACTIVE_MENU_ACTION_TYPE.EDIT_CLIENT,
      setFormData
    );

    toggleModal(true);
    try {
    } catch (error) {
      console.error(`Error fetching form template for (${id}):`, error);
    }
  }

  // Show property menu
  const openEditPropertyMenuHandler = async (id: string) => {
    if (!id || typeof id !== "string") {
      throw new Error(`Invalid id: ${id}`);
    }
    const response = await getPropertyById(id);
    const { responseData: activeProperty } = response;
    dispatchProperty({
      type: REDUCER_ACTIONS_PROPERTY.UPDATE_ACTIVE_PROPERTY,
      payload: { activeProperty: activeProperty as PropertyItemI },
    });

    const { responseData: editPropertyFormTemplate } = await getEditPropertyTemplate(id);
    menuContentChangeHandler(ACTIVE_MENU_ACTION_TYPE.EDIT_PROPERTY);
    setupMenuHandler(
      editPropertyFormTemplate,
      ACTIVE_MENU_ACTION_TYPE.EDIT_PROPERTY,
      setFormData
    );
    toggleModal(true);
  };

  // STYLE
  const iconSize: string = "25px";
  const iconColor: string = "var(--color_1)";

  // LAYOUT
  let activeEditHandler = async () => {};
  let activeDeleteHandler = async () => {};
  const clientItemData: ClientItemI = itemData as ClientItemI;
  const propertyItemData: PropertyItemI = itemData as PropertyItemI;

  let itemContent;
  switch (activeManagement) {
    case ACTIVE_MANAGEMENT.CLIENT_MANAGEMENT:
      activeEditHandler = async () => await openEditClientMenuHandler(itemData.id);
      activeDeleteHandler = async () => await deleteClientHandler(itemData.id);
      itemContent = (
        <>
          <span
            title={clientItemData["full_name"]}
            className={"my-auto mr-5 truncate"}
          >
            {clientItemData["full_name"]}
          </span>
          <span title={clientItemData["position"]} className="my-auto truncate">
            {clientItemData["position"]}
          </span>
        </>
      );
      break;
    case ACTIVE_MANAGEMENT.PROPERTY_MANAGEMENT:
      activeEditHandler = async () => await openEditPropertyMenuHandler(itemData.id);
      activeDeleteHandler = async () =>
        await deletePropertyHandler(itemData.id);
      itemContent = (
        <>
          <span
            title={propertyItemData.label}
            className={"my-auto mr-5 truncate"}
          >
            {propertyItemData.label}
          </span>
          <span title={propertyItemData.type} className="my-auto truncate">
            {propertyItemData.type}
          </span>
        </>
      );
      break;
    default:
      throw new Error(`text["error-unknown-action-type"] ${activeManagement}`);
  }

  // RENDER
  return (
    <div
      data-testid={testID["management-client-item"]}
      className="grid h-[56px] grid-flow-col grid-cols-[150px,1fr,40px,40px] grid-rows-1 gap-[0.5rem] overflow-hidden rounded bg-color_2 p-[0.5rem] focus-within:outline-2 lg:grid-cols-[200px,1fr,40px,40px]"
    >
      {itemContent}
      <ManagementItemButton
        title={text["title-edit"]}
        dataAction={dataAction["data-action-edit"]}
        clicked={activeEditHandler}
      >
        <EditIcon width={iconSize} height={iconSize} fill={iconColor} />
      </ManagementItemButton>
      <ManagementItemButton
        title={text["title-delete"]}
        dataAction={dataAction["data-action-delete"]}
        clicked={activeDeleteHandler}
      >
        <DeleteIcon width={iconSize} height={iconSize} fill={iconColor} />
      </ManagementItemButton>
    </div>
  );
};

export default ManagementItem;