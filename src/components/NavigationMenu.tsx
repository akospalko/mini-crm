// Navigate bwt components
import { NavLink, useMatch } from "react-router-dom"
import {
  DisplayClientIcon,
  ManagePropertiesIcon,
  ManageClientIcon,
} from "./UI/SVG"
import { HOVERED_BUTTONS, PAGE_ROUTES } from "../types/actionTypes"
import useHover from "../hooks/useHover"

const NavigationMenu = () => {
  // ROUTES
  // Match active routes to create check for conditional svg icon color
  const isClientsActive = useMatch(PAGE_ROUTES.CLIENTS_LIST)
  const isManageClientsActive = useMatch(PAGE_ROUTES.MANAGE_CLIENTS)
  const isManagePropertiesActive = useMatch(PAGE_ROUTES.MANAGE_PROPERTIES)

  // HOOK
  const { isHovered, handleHover, handleLeave } = useHover()

  // STYLE
  const activeLinkStyle: string =
    "flex justify-center items-center text-center w-[40px] h-[40px] cursor-default select-none rounded outline-none"
  const inactiveLinkStyle: string =
    "flex justify-center items-center w-[40px] h-[40px] text-center select-none rounded focus-visible-style"
  const iconSize: string = "30px"
  const iconColor: string = "var(--color_4)"
  const iconColorActive: string = "var(--color_accent)"
  const iconColorHovered: string = "var(--color_accent_secondary)"

  return (
    <div className="h-56px fixed top-0 flex w-full items-center gap-2 bg-color_2 p-[0.5rem] lg:static lg:h-[calc(100vh-2*2rem)] lg:flex-col">
      <NavLink
        title="Clients"
        to="/clients"
        className={({ isActive }) =>
          isActive ? activeLinkStyle : inactiveLinkStyle
        }
        tabIndex={isClientsActive ? -1 : 1}
        onMouseEnter={() => handleHover(HOVERED_BUTTONS.CLIENTS_PAGE_BUTTON)}
        onMouseLeave={() => handleLeave(HOVERED_BUTTONS.CLIENTS_PAGE_BUTTON)}
      >
        <DisplayClientIcon
          width={iconSize}
          height={iconSize}
          fill={
            isClientsActive
              ? iconColorActive
              : isHovered[HOVERED_BUTTONS.CLIENTS_PAGE_BUTTON]
                ? iconColorHovered
                : iconColor
          }
        />
      </NavLink>
      <NavLink
        title="Manage Clients"
        to="/manage-clients"
        className={({ isActive }) =>
          isActive ? activeLinkStyle : inactiveLinkStyle
        }
        tabIndex={isManageClientsActive ? -1 : 1}
        onMouseEnter={() =>
          handleHover(HOVERED_BUTTONS.MANAGE_CLIENTS_PAGE_BUTTON)
        }
        onMouseLeave={() =>
          handleLeave(HOVERED_BUTTONS.MANAGE_CLIENTS_PAGE_BUTTON)
        }
      >
        <ManageClientIcon
          width={iconSize}
          height={iconSize}
          fill={
            isManageClientsActive
              ? iconColorActive
              : isHovered[HOVERED_BUTTONS.MANAGE_CLIENTS_PAGE_BUTTON]
                ? iconColorHovered
                : iconColor
          }
        />
      </NavLink>
      <NavLink
        title="Manage Properties"
        to="/manage-properties"
        className={({ isActive }) =>
          isActive ? activeLinkStyle : inactiveLinkStyle
        }
        tabIndex={isManagePropertiesActive ? -1 : 1}
        onMouseEnter={() =>
          handleHover(HOVERED_BUTTONS.MANAGE_PROPERTIES_PAGE_BUTTON)
        }
        onMouseLeave={() =>
          handleLeave(HOVERED_BUTTONS.MANAGE_PROPERTIES_PAGE_BUTTON)
        }
      >
        <ManagePropertiesIcon
          width={iconSize}
          height={iconSize}
          fill={
            isManagePropertiesActive
              ? iconColorActive
              : isHovered[HOVERED_BUTTONS.MANAGE_PROPERTIES_PAGE_BUTTON]
                ? iconColorHovered
                : iconColor
          }
        />
      </NavLink>
    </div>
  )
}

export default NavigationMenu
