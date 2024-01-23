// Date input field
import {ChangeEvent} from "react";
import useForm from "../../hooks/useForm";
import {ClientFormTemplateI, PropertyFormTemplateI} from "../../types/types";
import Label from "./Label";

interface DateInputProps {
  value: string,
  name: string,
  label: string,
  required: boolean
}

const DateInput = ({value, name, label, required}: DateInputProps) => {
  // CONTEXT
  const {setFormData} = useForm();
  
  // HANDLER
  const onDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: {
          ...prevFormData[name], 
          value: value, 
        },
      } as ClientFormTemplateI | PropertyFormTemplateI;
    })
  }

  return (
    <div className="grid grid-rows-[1fr 1fr] w-full h-[75px]">
      {label && <Label content={label} elemTitle={name}/>}
      <input 
        className="h-[40px] bg-color_6 text-color_4 p-1 rounded focus-visible-style"
        type="date" 
        name={name} 
        value={value} 
        onChange={onDateChange} 
        required={required}
      />
    </div>
  );
};

export default DateInput;