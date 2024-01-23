// Control Buttons for management item components
import {ReactNode} from "react";
import testID from "../../data/data_test_id.json";

interface ManagementItemButtonPropsI {
  children: ReactNode
  changed: () => void,
  title: string,
  dataAction: string
}

const ManagementItemButton = ({changed, title, children, dataAction}: ManagementItemButtonPropsI) => {

  return (
    <button
      data-testid={testID["button-manage-item"]}
      data-action={dataAction}
      title={title}
      className="w-[40px] h-[40px] bg-color_accent hover:bg-color_accent_secondary text-color_4 rounded m-auto focus-visible-style"
      onClick={changed}
    >{children}</button>
  )
}

export default ManagementItemButton;