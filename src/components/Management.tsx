// Manage listed clients: read, create, edit, delete
import { memo } from "react";
import CreateItemButton from "./UI/CreateItemButton";
import useForm from "../hooks/useForm";
import useToggleMenu from "../hooks/useToggleMenu";
import {
  ACTIVE_MANAGEMENT,
  ACTIVE_MENU_ACTION_TYPE,
} from "../types/actionTypes";
import {
  ClientItemI,
  PropertyItemI,
  ManagementIProps,
} from "../types/types";
import EmptyList from "./EmptyList";
import ManagementItem from "./ManagementItem";
import text from "../data/text.json";
import { getCreateClientTemplate, getCreatePropertyTemplate } from "../Requests/apiRequests";

const Management = ({ data, activeManagementTab }: ManagementIProps) => {
  // CONTEXTS
  const { setupMenuHandler } = useToggleMenu(); // TODO: add type - setupMenuHandler
  const { setFormData } = useForm();

  const openCreateClientMenuHandler = async (): Promise<void> => {
    const { responseData: createClientTemplate } = await getCreateClientTemplate();
    setupMenuHandler (
      createClientTemplate, // formTemplate, 
      ACTIVE_MENU_ACTION_TYPE.CREATE_CLIENT, // menuActionType,
      setFormData
    )
  };

  // Open create property menu handler
  const openCreatePropertyMenuHandler = async (): Promise<void> => {
    const { responseData: createPropertyTemplate } = await getCreatePropertyTemplate();
    setupMenuHandler (
      createPropertyTemplate,
      ACTIVE_MENU_ACTION_TYPE.CREATE_PROPERTY,
      setFormData
    );
  }

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
          <ManagementItem
            key={item.id}
            itemData={item as ClientItemI}
            activeManagement={ACTIVE_MANAGEMENT.CLIENT_MANAGEMENT}
          />
        );
        break;
      case ACTIVE_MANAGEMENT.PROPERTY_MANAGEMENT:
        activeContent = (
          <ManagementItem
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