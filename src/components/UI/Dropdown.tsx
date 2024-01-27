// Dropdown input field for selecting job positions
import { ChangeEvent } from "react"
import { JobPositionsE, DropdownProps } from "../../types/types"
import useUpdateFormDataValue from "../../hooks/useUpdateFormDataValue"
import Label from "./Label"

const Dropdown = ({ name, label, options, value }: DropdownProps) => {
  // HOOK
  const updateFormDataValue = useUpdateFormDataValue()

  // HANDLER
  // Update select value on dropdown change
  const dropdownChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as JobPositionsE
    updateFormDataValue(name, selectedValue)
  }

  return (
    <div className="grid-rows-[1fr 1fr] grid h-[75px] w-full">
      {label && <Label content={label} elemTitle={name} />}
      <select
        className="flex h-[40px] rounded bg-color_6 p-2 text-color_4 focus-visible-style"
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

export default Dropdown
