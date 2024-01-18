// Dropdown input field for selecting job positions 
import {ChangeEvent} from "react";
import {JobPositionsE} from "../../types/types";
import useUpdateFormDataValue from "../../hooks/useUpdateFormDataValue";

interface DropdownProps {
  name: string,
  label: string,
  options: JobPositionsE[],
  value: JobPositionsE,
}

const Dropdown = ({ name, label, options, value }: DropdownProps) => {
  // HOOK
  const updateFormDataValue = useUpdateFormDataValue();
  
  // HANDLER
  // Update select value on dropdown change
  const dropdownChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as JobPositionsE;
    updateFormDataValue(name, selectedValue)
  };

  return (
    <div className="grid grid-rows-[1fr 1fr] w-full h-[70px]">
      {label && <label className="flex items-center w-full h-[35px]">{label}</label>}
      <select 
        className="h-[35px] p-1 rounded bg-slate-400 text-gray-900"
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