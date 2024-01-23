// Reusable menu modal with backdrop
import {ReactElement, useEffect} from "react";
import useToggleMenu from "../../hooks/useToggleMenu";
import useForm from "../../hooks/useForm";
import {ACTIVE_MENU_ACTION_TYPE} from "../../types/actionTypes";
import {ClientFormTemplateI, PropertyFormTemplateI} from "../../types/types";
import Form from "./Form";
import {CloseIcon} from "./SVG";
import testID from "../../data/data_test_id.json";
import text from "../../data/text.json";

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
  const headerStyle: string = "text-3xl my-8";
  const buttonSize: string = "15px";
  const buttonColor: string = "var(--color_accent)";

  // JSX
  // Reusable menu header
  const menuHeader = (content: string) => (
    <h3
      data-testid={testID["menu-title"]}
      className={headerStyle}
    > {content}
    </h3>
  )

  const createClientMenu: ReactElement = (
    <>
      {menuHeader(`${text["title-create"]} ${text["client"]}`)}
      <Form action={ACTIVE_MENU_ACTION_TYPE.CREATE_CLIENT}/>  
    </>
  )

  const editClientMenu: ReactElement = (
    <>
      {menuHeader(`${text["title-edit"]} ${text["client"]}`)}
      <Form action={ACTIVE_MENU_ACTION_TYPE.EDIT_CLIENT}/>  
    </>
  )

  // const viewClientMenu: ReactElement = (
  //   <>
  //     {menuHeader(`${text["title-view"]} ${text["client"]}`)}
  //     <ClientCardMenu/>
  //   </>
  // )

  const createPropertyMenu: ReactElement = (
    <>
      {menuHeader(`${text["title-create"]} ${text["property"]}`)}
      <Form action={ACTIVE_MENU_ACTION_TYPE.CREATE_PROPERTY}/>  
    </>
  )

  const editPropertyMenu: ReactElement = (
    <>
      {menuHeader(`${text["title-edit"]} ${text["property"]}`)}
      <Form action={ACTIVE_MENU_ACTION_TYPE.EDIT_PROPERTY}/>  
    </>
  )

  // Get menu content
  let menu: ReactElement = <></>;
  switch(menuContent) {
    case ACTIVE_MENU_ACTION_TYPE.CREATE_CLIENT: 
      menu = createClientMenu;
      break;
    case ACTIVE_MENU_ACTION_TYPE.EDIT_CLIENT:
      menu = editClientMenu;
      break;
    // case ACTIVE_MENU_ACTION_TYPE.VIEW_CLIENT:
    //   menu = viewClientMenu;
    //   break;
    case ACTIVE_MENU_ACTION_TYPE.CREATE_PROPERTY:
      menu = createPropertyMenu;
      break;
    case ACTIVE_MENU_ACTION_TYPE.EDIT_PROPERTY:
      menu = editPropertyMenu;
      break;
    default: 
      throw new Error(`${text["error-unknown-action-type"]} ${menuContent}`)
  }
  
  return (
    <div 
      data-testid={testID["menu-backdrop"]}
      className="fixed top-0 bottom-0 left-0 right-0 bg-color_1 bg-opacity-90 z-10"
      onClick={() => {
        toggleModal(false);
        setFormData({} as ClientFormTemplateI | PropertyFormTemplateI)
      }}
    >
      <div 
        data-testid={testID["menu-modal"]}
        className="flex w-full lg:w-[450px] flex-col items-center bg-color_2 h-full m-0 mx-auto p-4 overflow-y-scroll"
        onClick={e => e.stopPropagation()}
      >
        <div 
          data-testid={testID["menu-button-container"]}
          className="flex justify-end items-center w-full"
        > 
          <button 
            data-testid={testID["button-menu-close"]}
            title={text["close"]}
            className="border-2 border-color_accent bg-transparent 
            focus-visible-style w-[40px] h-[40px] rounded"
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
        {menu}
      </div>
    </div>
  )
}

export default Menu;