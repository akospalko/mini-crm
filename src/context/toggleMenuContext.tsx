// Menu/modal toggler context: states, handlers 
import {createContext, useState} from "react";
import {ChildrenType} from "../types/types";
import {UseToggleMenuContextI} from "../types/types";
import {modalScrollLock} from "../utility/modalScrollLock";
import {ACTIVE_MENU_ACTION_TYPE} from "../types/actionTypes";

// ---------CONTEXT LOGIC----------
// eslint-disable-next-line react-refresh/only-export-components
export const useToggleMenuContext: () => UseToggleMenuContextI = () => {
  // STATE
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [menuContent, setMenuContent] = useState<ACTIVE_MENU_ACTION_TYPE>(ACTIVE_MENU_ACTION_TYPE.DEFAULT);

  // HANDLER
  // Toggle menu and lock scroll for fixed position modals
  const toggleModal = (forcedValue?: boolean): void => {
    setIsToggled((prevModal) => {
      const newModalValue: boolean = forcedValue ? forcedValue : !prevModal;
      modalScrollLock(!newModalValue);
      return newModalValue;
    });
  };

  // Set active menu content key 
  const menuContentChangeHandler = (activeContent: ACTIVE_MENU_ACTION_TYPE = ACTIVE_MENU_ACTION_TYPE.DEFAULT): void => {
    setMenuContent(activeContent);
  };

  return {isToggled, toggleModal, menuContent, menuContentChangeHandler}
}

// ----------CREATE CONTEXT----------
const initContextState: UseToggleMenuContextI = {
  isToggled: false,
  menuContent: ACTIVE_MENU_ACTION_TYPE.DEFAULT,
  toggleModal: () => {},
  menuContentChangeHandler: () => {},
}

const ToggleMenuContext = createContext<UseToggleMenuContextI>(initContextState);

// ----------CREATE PROVIDER----------
export const ToggleMenuProvider = ({ children }: ChildrenType) => {

 return(
    <ToggleMenuContext.Provider value={ useToggleMenuContext() }>
      { children }
    </ToggleMenuContext.Provider>
  )
}

export default ToggleMenuContext;