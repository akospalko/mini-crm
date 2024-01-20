// Create client or property button
import { PlusIcon } from "./SVG";
import testID from "../../data/data_test_id.json";

interface CreateItemButtonPropsI {
  title: string,
  changed: () => void,
}

const CreateItemButton = ({title, changed}: CreateItemButtonPropsI) => {

  // STYLE
  const iconSize: string = "20px"; 
  const iconBorder: string = "transparent";
  const iconColor: string = "rgb(31 41 55)";
  
  return (
    <button
      data-testid={testID["button-menu-open"]}
      title={title}
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 my-auto w-[50px] h-[50px] rounded select-none"
      onClick={changed}
    >
      <PlusIcon
        height={iconSize}
        width={iconSize}
        stroke={iconBorder}
        fill={iconColor}
      />
    </button>
  )
}

export default CreateItemButton;