// Control Buttons for management item components
import { ReactNode } from "react";
import testID from "../../data/data_test_id.json";

interface ManagementItemButtonPropsI {
  children: ReactNode
  itemID: string
  changed: (itemID: string) => void,
  title: string,
  dataAction: string
}

const ManagementItemButton = ({itemID, changed, title, children, dataAction}: ManagementItemButtonPropsI) => {

  // STYLE
  const buttonStyle: string = "w-[50px] h-[50px] bg-slate-600 hover:bg-slate-700 text-gray-800"; 
 
  return (
      <button
        data-testid={testID["button-manage-item"]}
        data-action={dataAction}
        title={title}
        className={buttonStyle}
        onClick={() => changed(itemID)}
      >{children}</button>
  )
}

export default ManagementItemButton;