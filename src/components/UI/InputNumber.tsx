// Reusable input/textarea field for handling text types
import { ChangeEvent } from "react"
import useForm from "../../hooks/useForm"
import {
  ClientFormTemplateI,
  PropertyFormTemplateI,
  InputNumberPropsI,
} from "../../types/types"
import Label from "./Label"

const InputNumber = ({ name, type, label, value, required }: InputNumberPropsI) => {
  // CONTEXT
  const { setFormData } = useForm()

  // HANDLER
  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    const parsedValue = parseInt(value, 10);
    
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: {
          ...prevFormData[name],
          value: parsedValue,
        },
      } as ClientFormTemplateI | PropertyFormTemplateI
    })
  }

  // JSX
  return (
    <div className="grid-rows-[1fr 1fr] grid h-[75px] w-full">
      {label && <Label content={label} elemTitle={name} />}
      <input
        className={"h-[40px] rounded bg-color_6 p-2 text-color_4 focus:outline-none focus-visible:outline-2 focus-visible:outline-color_accent focus-visible:outline-offset-2"}
        name={name}
        type={type}
        value={value}
        onChange={inputChangeHandler}
        required={required}
      />
    </div>
  )
}

export default InputNumber