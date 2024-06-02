// Dropdown input field for selecting job positions
import { ChangeEvent } from "react"
import Label from "../UI/Label"
import useForm from "../../hooks/useForm"
import { DropdownPropsI } from "../../types/types"

// TODO Adjust types for options and value fields
const InputDropdown = ({ name, label, options, value }: DropdownPropsI) => {
  // CONTEXT
  const { setFormData } = useForm();

  // HANDLER
  const dropdownChangeHandler = (e:ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setFormData((prevState) => {
      const prevStateCopy = JSON.parse(JSON.stringify(prevState));
      prevStateCopy[name].value = value;
      return prevStateCopy;
    });
  };

  return (
    <div className="grid-rows-[1fr 1fr] grid h-[75px] w-full">
      {label && <Label content={label} elemTitle={name} />}
      <select
        className="flex h-[40px] rounded bg-color_6 p-2 text-color_4 focus-visible-style"
        name={name}
        value={value}
        onChange={dropdownChangeHandler}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default InputDropdown