// Manage listed clients: read, create, edit, delete
import {memo} from "react";
import ClientMangementItem from "./ClientMangementItem";
import PropertyManagementItem from "./PropertyManagementItem";
import CreateItemButton from "./UI/CreateItemButton";
import useForm from "../hooks/useForm";
import useToggleMenu from "../hooks/useToggleMenu";
import useFormDataTemplate from "../hooks/useFormDataTemplate";
import {ACTIVE_MANAGEMENT, ACTIVE_MENU_ACTION_TYPE} from "../types/actionTypes";
import {ClientItemI, PropertyItemI, ClientFormTemplateI, PropertyFormTemplateI} from "../types/types";
import EmptyList from "./EmptyList";

interface ManagementIProps {
  data: ClientItemI[] | PropertyItemI[]
  activeManagementTab: ACTIVE_MANAGEMENT
}

const Management = ({data, activeManagementTab}: ManagementIProps) => {
  // CONTEXTS
  const {toggleModal, menuContentChangeHandler} = useToggleMenu();
  const {setFormData} = useForm();

  // HOOK
  const {getClientFormTemplate, getPropertyFormTemplate} = useFormDataTemplate(); 
 
  // HANDLERS
  const openMenuHandler = (formTemplateGetter: () => ClientFormTemplateI | PropertyFormTemplateI, menuActionType: ACTIVE_MENU_ACTION_TYPE): void => {
    // Toggle menu modal
    toggleModal(true); 
    // Set up active form template
    setFormData(formTemplateGetter());
    // Set menu content
    menuContentChangeHandler(menuActionType);
  }

  const openCreateClientMenuHandler = (): void => openMenuHandler(getClientFormTemplate, ACTIVE_MENU_ACTION_TYPE.CREATE_CLIENT);
  const openCreatePropertyMenuHandler = (): void => openMenuHandler(getPropertyFormTemplate, ACTIVE_MENU_ACTION_TYPE.CREATE_PROPERTY);

  // Conditional menu handler
  let propertyMenuHandler: () => void;
  switch(activeManagementTab) {
    case ACTIVE_MANAGEMENT.CLIENT_MANAGEMENT:
      propertyMenuHandler = openCreateClientMenuHandler;
      break;
    case ACTIVE_MANAGEMENT.PROPERTY_MANAGEMENT:
      propertyMenuHandler = openCreatePropertyMenuHandler
      break;
  }

  // JSX
  const tabContent = data.map( (item: ClientItemI | PropertyItemI) => {
    let activeContent;

    switch (activeManagementTab) {
      case ACTIVE_MANAGEMENT.CLIENT_MANAGEMENT:
        activeContent = <ClientMangementItem key={item.id} itemData={item as ClientItemI}/>;
        break;
      case ACTIVE_MANAGEMENT.PROPERTY_MANAGEMENT:
        activeContent = <PropertyManagementItem key={item.id} itemData={item as PropertyItemI} />;
        break;
      default:
        activeContent = <span key={item.id}>Error</span>;
    }

    return activeContent;
  });

  return (
    <div className="grid grid-rows-[50px,1fr] grid-cols-1 gap-5 pt-5">
      <CreateItemButton changed={propertyMenuHandler} title="Create"/>
        <div className="flex flex-col w-full gap-5">
        {data?.length ? tabContent : <EmptyList/> }
      </div>
    </div>
  )
}

const MemoizedManagement = memo(Management);
export default MemoizedManagement;