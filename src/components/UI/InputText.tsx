// Reusable input/textarea field for handling text types 
import {ChangeEvent} from "react";
import useForm from "../../hooks/useForm";
import {ClientFormTemplateI, PropertyFormTemplateI, InputFieldTypesE} from "../../types/types";
import Label from "./Label";

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
  
  // STYLE
  const inputFocusVisibleStyle: string = `focus:outline-none focus-visible:outline-2 focus-visible:outline-color_accent
  focus-visible:outline-offset-2`;
  
  // JSX
  const textElement = (
    <div className="grid grid-rows-[1fr 1fr] w-full h-[75px]">
      {label && <Label content={label} elemTitle={name}/>}
      <input 
        className={`h-[40px] bg-color_6 text-color_4 p-2 rounded ${inputFocusVisibleStyle}`}
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
      {label && <Label content={label} elemTitle={name}/>}
      <textarea 
        className={`w-full min-h-[115px] h-[115px] resize-y bg-color_6 text-color_4 rounded p-2 ${inputFocusVisibleStyle}`}
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