// Navigate bwt components
import {NavLink, useMatch} from "react-router-dom";
import {DisplayClientIcon, ManagePropertiesIcon, ManageClientIcon} from "./UI/SVG";
import {HOVERED_BUTTONS, PAGE_ROUTES} from "../types/actionTypes";
import useHover from "../hooks/useHover";

const NavigationMenu = () => {
  // ROUTES
  // Match active routes to create check for conditional svg icon color   
  const isClientsActive = useMatch(PAGE_ROUTES.CLIENTS_LIST);
  const isManageClientsActive = useMatch(PAGE_ROUTES.MANAGE_CLIENTS);
  const isManagePropertiesActive = useMatch(PAGE_ROUTES.MANAGE_PROPERTIES);

  // HOOK
  const {isHovered, handleHover, handleLeave} = useHover();

  // STYLE
  const activeLinkStyle: string = "flex justify-center items-center text-center w-[40px] h-[40px] cursor-default select-none rounded";
  const inactiveLinkStyle: string = "flex justify-center items-center w-[40px] h-[40px] text-center select-none rounded";
  const iconSize: string = "30px";
  const iconColor: string = "var(--color_3)";
  const iconColorActive: string = "var(--color_accent)";
  const iconColorHovered: string = "var(--color_accent_secondary)";

  return (
    <div className="fixed flex items-center lg:flex-col top-0 lg:static h-56px lg:h-[calc(100vh-2*2rem)] w-full p-[0.5rem] bg-color_2 gap-5">
      <NavLink
        title="Clients"
        to="/clients"
        className={({isActive}) => isActive ? activeLinkStyle : inactiveLinkStyle}
        onMouseEnter={() => handleHover(HOVERED_BUTTONS.CLIENTS_PAGE_BUTTON)}
        onMouseLeave={() => handleLeave(HOVERED_BUTTONS.CLIENTS_PAGE_BUTTON)}
      > 
        <DisplayClientIcon
          width={iconSize}
          height={iconSize}
          fill={isClientsActive ? iconColorActive : isHovered[HOVERED_BUTTONS.CLIENTS_PAGE_BUTTON] ? iconColorHovered : iconColor}         
        />
      </NavLink>
      <NavLink
        title="Manage Clients"
        to="/manage-clients"
        className={({isActive}) => isActive ? activeLinkStyle : inactiveLinkStyle}
        onMouseEnter={() => handleHover(HOVERED_BUTTONS.MANAGE_CLIENTS_PAGE_BUTTON)}
        onMouseLeave={() => handleLeave(HOVERED_BUTTONS.MANAGE_CLIENTS_PAGE_BUTTON)}
      > 
        <ManageClientIcon
          width={iconSize}
          height={iconSize}
          fill={isManageClientsActive ? iconColorActive : isHovered[HOVERED_BUTTONS.MANAGE_CLIENTS_PAGE_BUTTON] ? iconColorHovered : iconColor}  
        />
      </NavLink>
      <NavLink
        title="Manage Properties"
        to="/manage-properties"
        className={({isActive}) => isActive ? activeLinkStyle : inactiveLinkStyle}
        onMouseEnter={() => handleHover(HOVERED_BUTTONS.MANAGE_PROPERTIES_PAGE_BUTTON)}
        onMouseLeave={() => handleLeave(HOVERED_BUTTONS.MANAGE_PROPERTIES_PAGE_BUTTON)}
      >
        <ManagePropertiesIcon
          width={iconSize}
          height={iconSize}
          fill={isManagePropertiesActive ? iconColorActive : isHovered[HOVERED_BUTTONS.MANAGE_PROPERTIES_PAGE_BUTTON] ? iconColorHovered : iconColor}  
        />
      </NavLink>
    </div>
  )
}

export default NavigationMenu;