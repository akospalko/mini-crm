// Reusable input/textarea field for handling text types 
import {ChangeEvent} from "react";
import useForm from "../../hooks/useForm";
import {ClientFormTemplateI, PropertyFormTemplateI, InputFieldTypesE} from "../../types/types";

interface InputTextPropsI {
  name: string,
  type: InputFieldTypesE.text | InputFieldTypesE.textarea,
  label: string
  value: string,
  required: boolean
}

const InputText = ({name, type, label, value, required}: InputTextPropsI) => {
  // CONTEXT
  const {setFormData} = useForm();

  // HANDLER
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: {
          ...prevFormData[name], 
          value: value, 
        },
      } as ClientFormTemplateI | PropertyFormTemplateI;
    });
  };
  
  // JSX
  const textElement = (
    <div className="grid grid-rows-[1fr 1fr] w-full h-[70px]">
      {label && <label className="flex items-center w-full h-[35px]">{label}</label>}
      <input 
        className="h-[35px] p-1 rounded bg-slate-400 text-gray-900"
        name={name}
        type={type}
        value={value} 
        onChange={inputChangeHandler} 
        required={required}
      />
    </div>
  );

  const textareaElement = (
    <div className="grid grid-rows-[1fr auto] w-full min-h-[150px]">
      {label && <label className="flex items-center w-full h-[35px]">{label}</label>}
      <textarea 
        className="w-full min-h-[115px] h-[115px] resize-y rounded p-1 bg-slate-400 text-gray-900"
        name={name}
        value={value} 
        onChange={inputChangeHandler} 
        // placeholder="..."
        rows={5}
        cols={30}
        required={required}
      />
    </div>
  );

  let displayedInputElement;
  switch(type) {
    case InputFieldTypesE.text: 
    displayedInputElement = textElement;
      break;
    case InputFieldTypesE.textarea:
      displayedInputElement = textareaElement;
      break;
    default:
      displayedInputElement = textElement;
  }

  return displayedInputElement;
}

export default InputText;