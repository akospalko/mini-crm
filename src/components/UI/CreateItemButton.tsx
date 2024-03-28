// Create client or property button
import { CreateItemButtonPropsI } from "../../types/types";
import { PlusIcon } from "./SVG";
import testID from "../../data/data_test_id.json";
import text from "../../data/text.json";

const CreateItemButton = ({ title, clicked }: CreateItemButtonPropsI) => {
  // STYLE
  const iconSize: string = "16px";
  const iconBorder: string = "transparent";
  const iconColor: string = "var(--color_1)";

  return (
    <button
      data-testid={testID["button-menu-open"]}
      title={title}
      className="h-[50px] w-[125px] select-none rounded bg-color_accent px-[0.5rem] hover:bg-color_accent_secondary focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color_accent"
      onClick={clicked}
    >
      <div className="flex justify-center">
        <PlusIcon
          wrapperCustomStyle={{
            paddingRight: "0.25rem",
            margin: "auto 0",
            width: "auto",
          }}
          height={iconSize}
          width={iconSize}
          stroke={iconBorder}
          fill={iconColor}
        />
        <span className="flex font-roboto text-lg font-medium text-color_1">
          {text["title-create"]}
        </span>
      </div>
    </button>
  );
};

export default CreateItemButton;
