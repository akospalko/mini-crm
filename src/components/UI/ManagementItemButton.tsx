// Control Buttons for management item components
import { ReactNode } from "react"
import testID from "../../data/data_test_id.json"

interface ManagementItemButtonPropsI {
  children: ReactNode
  changed: () => void
  title: string
  dataAction: string
}

const ManagementItemButton = ({
  changed,
  title,
  children,
  dataAction,
}: ManagementItemButtonPropsI) => {
  return (
    <button
      data-testid={testID["button-manage-item"]}
      data-action={dataAction}
      title={title}
      className="m-auto h-[40px] w-[40px] rounded bg-color_accent text-color_4 focus-visible-style hover:bg-color_accent_secondary"
      onClick={changed}
    >
      {children}
    </button>
  )
}

export default ManagementItemButton
