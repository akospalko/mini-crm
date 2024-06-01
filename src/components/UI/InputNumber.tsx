// Reusable number input field 
import { ChangeEvent } from "react"
import useForm from "../../hooks/useForm"
import { InputNumberPropsI } from "../../types/types"
import Label from "./Label"

const InputNumber = ({ name, type, label, value = '', required }: InputNumberPropsI) => {
  // CONTEXT
  const { setFormData } = useForm()

  // HANDLER
  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    const parsedValue = parseInt(value, 10);
    
    setFormData((prev) => {
      const newStateCopy = JSON.parse(JSON.stringify(prev));
      newStateCopy[name].value = parsedValue;
      return newStateCopy;
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