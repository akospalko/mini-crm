// Client item for management page
import useClients from "../hooks/useClients";
import useForm from "../hooks/useForm";
import useFormDataTemplate from "../hooks/useFormDataTemplate";
import useToggleMenu from "../hooks/useToggleMenu";
import {ACTIVE_MENU_ACTION_TYPE} from "../types/actionTypes";
import {ClientItemI, PopulateFormDataWithActiveClientI, ClientFormTemplateI} from "../types/types";
import {deleteItemByID, findActiveArrayItem, populateFormWithActiveData} from "../utility/misc";
import ManagementItemButton from "./UI/ManagementItemButton";
import {DeleteIcon, EditIcon} from "./UI/SVG";

interface ClientManagementI {
  itemData: ClientItemI
}

const ClientMangementItem = ({itemData}: ClientManagementI) => {
  // CONTEXT
  const {clients, dispatch: dispatchClients, REDUCER_ACTIONS_CLIENT} = useClients();
  const {toggleModal, menuContentChangeHandler} = useToggleMenu();
  const {setFormData} = useForm();

  // HOOK
  const {getClientFormTemplate} = useFormDataTemplate(); 

  // UTIL
  // remap activeClients so it has a formData compatible format (remap its nested properties)
  const getActiveClientWithRemappedProperties = (activeClientData: ClientItemI): PopulateFormDataWithActiveClientI => {
    if (!activeClientData) {
      return {}; 
    }
  
    const updatedActiveClient: PopulateFormDataWithActiveClientI = { ...activeClientData };
  
    if (activeClientData.properties && activeClientData.properties.length > 0) {
      activeClientData.properties.forEach(property => {
        if (property.id) {
          updatedActiveClient[property.id] = property.value;
        }
      });
  
      // remove "properties" entry
      delete updatedActiveClient.properties;
  
      return updatedActiveClient;
    }
    return updatedActiveClient;
  };

  // HANDLERS
  // Find client and open edit modal
  const editClientHandler = (clientID: string): void => {
    // set up active menu content
    menuContentChangeHandler(ACTIVE_MENU_ACTION_TYPE.EDIT_CLIENT);
    // find active client item
    const activeClient = findActiveArrayItem(clientID, clients) as ClientItemI;
    // update state
    dispatchClients({
      type: REDUCER_ACTIONS_CLIENT.UPDATE_ACTIVE_CLIENT,
      payload: {activeClient: activeClient},
    });
    // process active client
    const activeClientRemapped: PopulateFormDataWithActiveClientI = getActiveClientWithRemappedProperties(activeClient);
    // populate form data fields with processed active client's value
    const clientFormTemplate: ClientFormTemplateI = getClientFormTemplate();
    // populate form
    const populatedForm = populateFormWithActiveData(activeClientRemapped, clientFormTemplate);
    // update form state with populated data
    setFormData(populatedForm);
    // open modal
    toggleModal(true);
  }

  // Delete client from data storage
  const deleteClientHandler = (itemID: string): void => {
    // filter data 
    const updatedClient = deleteItemByID(itemID, clients) as ClientItemI[];
    // update state
    dispatchClients({
      type: REDUCER_ACTIONS_CLIENT.DELETE_CLIENT,
      payload: {clients: updatedClient},
    });
  }

  // STYLE 
  const iconSize: string = "25px"; 
  const iconColor: string = " rgb(209 213 219)";

  return (
    <div className="bg-slate-500 rounded grid grid-cols-[1fr,50px,50px] grid-rows-1 grid-flow-col h-[50px] overflow-hidden"> 
      <span className="flex items-center p-2 h-full">{itemData["full name"]}</span>
      <ManagementItemButton 
        changed={editClientHandler} 
        itemID={itemData.id} 
        title="Edit"
      >
        <EditIcon
          width={iconSize}
          height={iconSize}
          fill={iconColor}
        />
      </ManagementItemButton>
      <ManagementItemButton 
        changed={deleteClientHandler} 
        itemID={itemData.id} 
        title="Delete"
      >
        <DeleteIcon
          width={iconSize}
          height={iconSize}
          fill={iconColor}
        />
      </ManagementItemButton>
    </div>
  )
}

export default ClientMangementItem;