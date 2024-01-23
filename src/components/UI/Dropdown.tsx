// Dropdown input field for selecting job positions 
import {ChangeEvent} from "react";
import {JobPositionsE} from "../../types/types";
import useUpdateFormDataValue from "../../hooks/useUpdateFormDataValue";
import Label from "./Label";

interface DropdownProps {
  name: string,
  label: string,
  options: JobPositionsE[],
  value: JobPositionsE,
}

const Dropdown = ({name, label, options, value}: DropdownProps) => {
  // HOOK
  const updateFormDataValue = useUpdateFormDataValue();
  
  // HANDLER
  // Update select value on dropdown change
  const dropdownChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as JobPositionsE;
    updateFormDataValue(name, selectedValue)
  };

  return (
    <div className="grid grid-rows-[1fr 1fr] w-full h-[75px]">
      {label && <Label content={label} elemTitle={name}/>}
      <select 
        className="flex h-[40px] bg-color_6 text-color_4 p-2 rounded focus-visible-style"
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
  );
};

export default Dropdown;