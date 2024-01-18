// Date input field
import {ChangeEvent} from "react";
import useForm from "../../hooks/useForm";
import {ClientFormTemplateI, PropertyFormTemplateI} from "../../types/types";

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
    <div className="grid grid-rows-[1fr 1fr] w-full h-[70px]">
      {label && <label className="flex items-center w-full h-[35px]">{label}</label>}
      <input 
        className="dark:[color-scheme:light] text-lg h-[35px] p-1 rounded bg-slate-400 text-gray-900"
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