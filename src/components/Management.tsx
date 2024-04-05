// Manage listed clients: read, create, edit, delete
import { memo } from "react";
import CreateItemButton from "./UI/CreateItemButton";
import useForm from "../hooks/useForm";
import useToggleMenu from "../hooks/useToggleMenu";
import useFormDataTemplate from "../hooks/useFormDataTemplate";
import {
  ACTIVE_MANAGEMENT,
  ACTIVE_MENU_ACTION_TYPE,
} from "../types/actionTypes";
import {
  ClientItemI,
  PropertyItemI,
  ClientFormTemplateI,
  PropertyFormTemplateI,
  ManagementIProps,
} from "../types/types";
import EmptyList from "./EmptyList";
import MangementItem from "./MangementItem";
import text from "../data/text.json";

const Management = ({ data, activeManagementTab }: ManagementIProps) => {
  // CONTEXTS
  const { toggleModal, menuContentChangeHandler } = useToggleMenu();
  const { setFormData } = useForm();

  // HOOK
  const { getClientFormTemplate, getPropertyFormTemplate } = useFormDataTemplate();

  // HANDLERS
  // Setup menu
  const setupMenuHandler = (
    formTemplateGetter: () => ClientFormTemplateI | PropertyFormTemplateI,
    menuActionType: ACTIVE_MENU_ACTION_TYPE
  ): void => {
    // Set up active form template
    setFormData(formTemplateGetter());
    // Set menu content
    menuContentChangeHandler(menuActionType);
    // Toggle menu modal
    toggleModal(true);
  };

  // Open create client menu handler
  const openCreateClientMenuHandler = (): void =>
    setupMenuHandler(
      getClientFormTemplate,
      ACTIVE_MENU_ACTION_TYPE.CREATE_CLIENT
    );

  // Open create property menu handler
  const openCreatePropertyMenuHandler = (): void =>
    setupMenuHandler(
      getPropertyFormTemplate,
      ACTIVE_MENU_ACTION_TYPE.CREATE_PROPERTY
    );

  // Conditional menu handler
  let openMenuHandler: () => void;
  switch (activeManagementTab) {
    case ACTIVE_MANAGEMENT.CLIENT_MANAGEMENT:
      openMenuHandler = openCreateClientMenuHandler;
      break;
    case ACTIVE_MANAGEMENT.PROPERTY_MANAGEMENT:
      openMenuHandler = openCreatePropertyMenuHandler;
      break;
  }

  // JSX
  const tabContent = data.map((item: ClientItemI | PropertyItemI) => {
    let activeContent;

    switch (activeManagementTab) {
      case ACTIVE_MANAGEMENT.CLIENT_MANAGEMENT:
        activeContent = (
          <MangementItem
            key={item.id}
            itemData={item as ClientItemI}
            activeManagement={ACTIVE_MANAGEMENT.CLIENT_MANAGEMENT}
          />
        );
        break;
      case ACTIVE_MANAGEMENT.PROPERTY_MANAGEMENT:
        activeContent = (
          <MangementItem
            key={item.id}
            itemData={item as PropertyItemI}
            activeManagement={ACTIVE_MANAGEMENT.PROPERTY_MANAGEMENT}
          />
        );
        break;
      default:
        activeContent = <span key={item.id}>Error</span>;
    }

    return activeContent;
  });

  return (
    <div className="grid grid-cols-1 grid-rows-[50px,1fr] gap-5">
      <CreateItemButton
        title={text["title-create"]}
        clicked={openMenuHandler}
      />
      <div className="flex w-full flex-col gap-5">
        {data?.length ? tabContent : <EmptyList />}
      </div>
    </div>
  );
};

const MemoizedManagement = memo(Management);
export default MemoizedManagement;
