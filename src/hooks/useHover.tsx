// Handle hover enter and leave on element
import { useState } from "react"
import { HOVERED_BUTTONS } from "../types/actionTypes"

// INITIALIZER
const hoveredStateInitializer = {
  [HOVERED_BUTTONS.CLIENTS_PAGE_BUTTON]: false,
  [HOVERED_BUTTONS.MANAGE_CLIENTS_PAGE_BUTTON]: false,
  [HOVERED_BUTTONS.MANAGE_PROPERTIES_PAGE_BUTTON]: false,
}

// Custom hook for handling hover state
const useHover = () => {
  // STATE
  const [isHovered, setIsHovered] = useState<{
    [key in HOVERED_BUTTONS]: boolean
  }>(hoveredStateInitializer)

  // HANDLERS
  // Set button hover status to true
  const handleHover = (buttonName: HOVERED_BUTTONS) => {
    setIsHovered((prevElements) => ({ ...prevElements, [buttonName]: true }))
  }

  // Set button hover status to false
  const handleLeave = (buttonName: HOVERED_BUTTONS) => {
    setIsHovered((prevElements) => ({ ...prevElements, [buttonName]: false }))
  }

  return {
    isHovered,
    handleHover,
    handleLeave,
  }
}

export default useHover
