// Control Buttons for management item components
import { ReactNode } from "react";

interface ManagementItemButtonPropsI {
  children: ReactNode
  itemID: string
  changed: (itemID: string) => void,
  title: string
}

const ManagementItemButton = ({itemID, changed, title, children}: ManagementItemButtonPropsI) => {
  // STYLE
  const buttonStyle: string = "w-[50px] h-[50px] bg-slate-600 hover:bg-slate-700 text-gray-800"; 
 
  return (
      <button
        title={title}
        className={buttonStyle}
        onClick={() => changed(itemID)}
      >{children}</button>
  )
}

export default ManagementItemButton;