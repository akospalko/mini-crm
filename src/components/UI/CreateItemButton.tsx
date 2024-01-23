// Create client or property button
import {PlusIcon} from "./SVG";
import testID from "../../data/data_test_id.json";
import text from "../../data/text.json";

interface CreateItemButtonPropsI {
  title: string,
  changed: () => void,
}

const CreateItemButton = ({title, changed}: CreateItemButtonPropsI) => {
  // STYLE
  const iconSize: string = "16px"; 
  const iconBorder: string = "transparent";
  const iconColor: string = "var(--color_1)";
  
  return (
    <button
      data-testid={testID["button-menu-open"]}
      title={title}
      className="hover:bg-color_accent_secondary bg-color_accent focus:outline-none focus-visible:outline-2 focus-visible:outline-color_accent
      focus-visible:outline-offset-2 px-[0.5rem] w-[125px] h-[50px] rounded select-none"
      onClick={changed}
    >
      <div className="flex justify-center">
        <PlusIcon
          wrapperCustomStyle={{paddingRight: "0.25rem", margin: "auto 0", width: "auto"}}
          height={iconSize}
          width={iconSize}
          stroke={iconBorder}
          fill={iconColor}
        />
        <span className="flex text-lg text-color_1 font-medium font-roboto">{text["title-create"]}</span>
      </div>
    </button>
  )
}

export default CreateItemButton;