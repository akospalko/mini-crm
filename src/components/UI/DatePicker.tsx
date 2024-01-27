// Date input field
import { ChangeEvent } from "react"
import useForm from "../../hooks/useForm"
import { ClientFormTemplateI, PropertyFormTemplateI, DateInputProps } from "../../types/types"
import Label from "./Label"

const DateInput = ({ value, name, label, required }: DateInputProps) => {
  // CONTEXT
  const { setFormData } = useForm()

  // HANDLER
  const onDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: {
          ...prevFormData[name],
          value: value,
        },
      } as ClientFormTemplateI | PropertyFormTemplateI
    })
  }

  return (
    <div className="grid-rows-[1fr 1fr] grid h-[75px] w-full">
      {label && <Label content={label} elemTitle={name} />}
      <input
        className="h-[40px] rounded bg-color_6 p-1 text-color_4 focus-visible-style"
        type="date"
        name={name}
        value={value}
        onChange={onDateChange}
        required={required}
      />
    </div>
  )
}

export default DateInput
