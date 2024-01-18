// Custom hook to consume ToggleMenuContext & export
import {useContext} from "react";
import ToggleMenuContext from "../context/toggleMenuContext";
import {UseToggleMenuContextType} from "../types/types";

const useToggleMenu = (): UseToggleMenuContextType => {
  return useContext(ToggleMenuContext);
}

export default useToggleMenu;