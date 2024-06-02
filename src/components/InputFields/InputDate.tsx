// Date input field
import { ChangeEvent } from "react"
import useForm from "../../hooks/useForm"
import { InputDateProps } from "../../types/types"
import Label from "../UI/Label"

const InputDate = ({ value, name, label, required }: InputDateProps) => {
  // CONTEXT
  const { setFormData } = useForm()

  // HANDLER
  const onDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => {
      const prevStateCopy = JSON.parse(JSON.stringify(prevState));
      prevStateCopy[name].value = value;
      return prevStateCopy;
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

export default InputDate
