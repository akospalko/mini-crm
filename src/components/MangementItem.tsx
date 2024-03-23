// TODO: Fix types
// Management page client and property pg
import useClients from "../hooks/useClients";
import useForm from "../hooks/useForm";
import useFormDataTemplate from "../hooks/useFormDataTemplate";
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
import { populateFormWithActiveData } from "../utility/misc";
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
} from "../Requests/apiRequests";
import { getClientById, getPropertyById } from "../Requests/apiRequests";

const MangementItem = ({
  itemData,
  activeManagement,
}: ClientManagementPropsI) => {
  // CONTEXTS
  const { dispatch: dispatchClients, REDUCER_ACTIONS_CLIENT } = useClients();
  const { dispatch: dispatchProperty, REDUCER_ACTIONS_PROPERTY } =
    useProperty();
  const { toggleModal, menuContentChangeHandler } = useToggleMenu();
  const { setFormData } = useForm();
  // HOOK
  const { getClientFormTemplate, getPropertyFormTemplate } =
    useFormDataTemplate();

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
      dispatchClients({
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

  // Show client menu
  const showClientHandler = async (id: string) => {
    if (!id || typeof id !== "string") {
      throw new Error(`Invalid id: ${id}`);
    }
    try {
      // Fetch data
      const response = await getClientById(id);
      const { responseData } = response;
      // Set up active menu content
      menuContentChangeHandler(ACTIVE_MENU_ACTION_TYPE.EDIT_CLIENT);
      // Update active property state
      dispatchClients({
        type: REDUCER_ACTIONS_CLIENT.UPDATE_ACTIVE_CLIENT,
        payload: { activeClient: responseData as ClientItemI },
      });

      // Populate form
      const populatedForm = populateFormWithActiveData(
        responseData,
        getClientFormTemplate()
      );
      // Update form state with populated data
      setFormData(populatedForm);
      // Open modal
      toggleModal(true);
    } catch (error) {
      // Handle errors
      console.error(`Error fetching property item (${id}):`, error);
    }
  };

  // Show property menu
  const showPropertyHandler = async (id: string) => {
    if (!id || typeof id !== "string") {
      throw new Error(`Invalid id: ${id}`);
    }
    try {
      // Fetch data
      const propertyData = await getPropertyById(id);
      const { responseData } = propertyData;
      // Set up active menu content
      menuContentChangeHandler(ACTIVE_MENU_ACTION_TYPE.EDIT_PROPERTY);
      // Update active property state
      dispatchProperty({
        type: REDUCER_ACTIONS_PROPERTY.UPDATE_ACTIVE_PROPERTY,
        payload: { activeProperty: responseData as PropertyItemI },
      });

      // Populate form
      const populatedForm = populateFormWithActiveData(
        responseData,
        getPropertyFormTemplate()
      );
      // Update form state with populated data
      setFormData(populatedForm);
      // Open modal
      toggleModal(true);
    } catch (error) {
      // Handle errors
      console.error(`Error fetching property item (${id}):`, error);
    }
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
      activeEditHandler = async () => await showClientHandler(itemData.id);
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
      activeEditHandler = async () => await showPropertyHandler(itemData.id);
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

export default MangementItem;
