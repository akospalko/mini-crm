// Navigate bwt components

import {NavLink, useMatch} from "react-router-dom";
import {DisplayClientIcon, ManagePropertiesIcon, ManageClientIcon} from "./UI/SVG";
import {PAGE_ROUTES} from "../types/actionTypes";

const NavigationMenu = () => {
  // ROUTES
  // Match active routes to create check for conditional svg icon color   
  const isClientsActive = useMatch(PAGE_ROUTES.CLIENTS_LIST);
  const isManageClientsActive = useMatch(PAGE_ROUTES.MANAGE_CLIENTS);
  const isManagePropertiesActive = useMatch(PAGE_ROUTES.MANAGE_PROPERTIES);

  // STYLE
  const activeLinkStyle: string = "flex justify-center items-center text-center w-[40px] h-[40px] bg-gray-800 text-gray-300 cursor-default select-none rounded";
  const inactiveLinkStyle: string = "flex justify-center items-center w-[40px] h-[40px] text-center hover:bg-gray-400 bg-gray-300 hover:text-gray-300 text-gray-900 select-none rounded";
  const iconSize: string = "25px";
  const iconColor: string = "rgb(31 41 55)";
  const iconColorActive: string = "rgb(209 213 219)";

  return (
    <div className="bg-slate-500 flex items-center h-[calc(100vh-2*2rem)] gap-5 flex-col w-full p-[0.5rem]">
      <NavLink
        title="Clients"
        to="/clients"
        className={({isActive}) => isActive ? activeLinkStyle : inactiveLinkStyle}
      > 
        <DisplayClientIcon
         width={iconSize}
         height={iconSize}
         fill={isClientsActive ? iconColorActive : iconColor}         
        />
      </NavLink>
      <NavLink
        title="Manage Clients"
        to="/manage-clients"
        className={({isActive}) => isActive ? activeLinkStyle : inactiveLinkStyle}
      > 
        <ManageClientIcon
          width={iconSize}
          height={iconSize}
          fill={isManageClientsActive ? iconColorActive : iconColor}  
        />
      </NavLink>
      <NavLink
        title="Manage Properties"
        to="/manage-properties"
        className={({isActive}) => isActive ? activeLinkStyle : inactiveLinkStyle}
      >
        <ManagePropertiesIcon
          width={iconSize}
          height={iconSize}
          fill={isManagePropertiesActive ? iconColorActive : iconColor}  
        />
      </NavLink>
    </div>
  )
}

export default NavigationMenu;