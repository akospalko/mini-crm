// Reusable menu modal with backdrop
import {ReactElement, useEffect} from "react";
import useToggleMenu from "../../hooks/useToggleMenu";
import useForm from "../../hooks/useForm";
import {ACTIVE_MENU_ACTION_TYPE} from "../../types/actionTypes";
import {ClientFormTemplateI, PropertyFormTemplateI} from "../../types/types";
import Form from "./Form";
import {CloseIcon} from "./SVG";
import testID from "../../data/data_test_id.json";

const Menu = () => {
  // CONTEXT
  const {toggleModal, menuContent} = useToggleMenu();
  const {setFormData} = useForm();

  // EFFECT
  // Handle menu closing on pressing esc btn 
   useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        toggleModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // STYLE 
  const headerStyle: string = "text-3xl";
  const buttonSize: string = "15px";
  const buttonColor: string = "rgb(148 163 184)";

  // JSX
  const createClientMenu: ReactElement = (
    <>
      <h3
        data-testid={testID["menu-title"]}
        className={headerStyle}> Create client </h3>
      <Form action={ACTIVE_MENU_ACTION_TYPE.CREATE_CLIENT}/>  
    </>
  )

  const editClientMenu: ReactElement = (
    <>
      <h3
        data-testid={testID["menu-title"]}
        className={headerStyle}>Edit client</h3>
      <Form action={ACTIVE_MENU_ACTION_TYPE.EDIT_CLIENT}/>  
    </>
  )

  const createPropertyMenu: ReactElement = (
    <>
      <h3
        data-testid={testID["menu-title"]}
        className={headerStyle}>Create property</h3>
      <Form action={ACTIVE_MENU_ACTION_TYPE.CREATE_PROPERTY}/>  
    </>
  )

  const editPropertyMenu: ReactElement = (
    <>
      <h3
        data-testid={testID["menu-title"]}
        className={headerStyle}>Edit property</h3>
      <Form action={ACTIVE_MENU_ACTION_TYPE.EDIT_PROPERTY}/>  
    </>
  )

  let displayedMenu;
  switch(menuContent) {
    case ACTIVE_MENU_ACTION_TYPE.CREATE_CLIENT: 
      displayedMenu = createClientMenu;
      break;
    case ACTIVE_MENU_ACTION_TYPE.EDIT_CLIENT:
      displayedMenu = editClientMenu;
      break;
    case ACTIVE_MENU_ACTION_TYPE.CREATE_PROPERTY:
      displayedMenu = createPropertyMenu;
      break;
    case ACTIVE_MENU_ACTION_TYPE.EDIT_PROPERTY:
      displayedMenu = editPropertyMenu;
      break;
    default: 
      throw new Error(`Undefined menu content (${menuContent}). Provived proper action type!`)
  }
  
  return (
    <div 
      data-testid={testID["menu-backdrop"]}
      className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-90"
      onClick={() => {
        toggleModal(false);
        setFormData({} as ClientFormTemplateI | PropertyFormTemplateI)
      }}
    >
      <div 
        data-testid={testID["menu-modal"]}
        className="flex w-[450px] flex-col items-center bg-gray-800 h-full m-0 mx-auto p-4 overflow-y-scroll"
        onClick={e => e.stopPropagation()}
      >
        <div 
          data-testid={testID["menu-button-container"]}
          className="flex justify-end items-center w-full"
        > 
          <button 
            data-testid={testID["button-menu-close"]}
            className="bg-gray-700 w-[40px] h-[40px] rounded"
            onClick={() => {
              toggleModal(false)
              setFormData({} as ClientFormTemplateI | PropertyFormTemplateI)
            }}
          > 
            <CloseIcon
              height={buttonSize}
              width={buttonSize}
              fill={buttonColor}
            /> 
          </button>
        </div>
        {displayedMenu}
      </div>
    </div>
  )
}

export default Menu;