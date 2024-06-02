// Reusable number input field 
import { ChangeEvent } from "react"
import Label from "../UI/Label"
import useForm from "../../hooks/useForm"
import { InputNumberPropsI } from "../../types/types"

const InputNumber = ({ name, type, label, value = '', required }: InputNumberPropsI) => {
  // CONTEXT
  const { setFormData } = useForm()

  // HANDLER
  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    
    if (value === '') {
      setFormData((prevState) => {
        const prevStateCopy = JSON.parse(JSON.stringify(prevState));
        prevStateCopy[name].value = '';
        return prevStateCopy;
      });
      return;
    }
    
    const parsedValue: number = parseInt(value, 10);
    
    if (isNaN(parsedValue)) {
      throw new Error(`The value provided for ${name} is not a valid integer: ${value}`);
    }
  
    setFormData((prevState) => {
      const prevStateCopy = JSON.parse(JSON.stringify(prevState));
      prevStateCopy[name].value = parsedValue;
      return prevStateCopy;
    });
  }

  // JSX
  return (
    <div className="grid-rows-[1fr 1fr] grid h-[75px] w-full">
      {label && <Label content={label} elemTitle={name} />}
      <input
        className={"h-[40px] rounded bg-color_6 p-2 text-color_4 focus:outline-none focus-visible:outline-2 focus-visible:outline-color_accent focus-visible:outline-offset-2"}
        name={name}
        type={type}
        value={value || ''}
        onChange={inputChangeHandler}
        required={required}
      />
    </div>
  )
}

export default InputNumber