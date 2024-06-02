// Reusable input/textarea field for handling text types
import { ChangeEvent } from "react"
import useForm from "../../hooks/useForm"
import {
  InputFieldTypesE,
  InputTextPropsI,
} from "../../types/types"
import Label from "../UI/Label"

const InputText = ({ name, type, label, value = '', required }: InputTextPropsI) => {
  // CONTEXT
  const { setFormData } = useForm()

  // HANDLER
  const textChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      const prevStateCopy = JSON.parse(JSON.stringify(prevState));
      prevStateCopy[name].value = value;
      return prevStateCopy;
    })
  }

  // JSX
  const textElement = (
    <div className="grid-rows-[1fr 1fr] grid h-[75px] w-full">
      {label && <Label content={label} elemTitle={name} />}
      <input
        className="h-[40px] rounded bg-color_6 p-2 text-color_4 focus:outline-none focus-visible:outline-2 focus-visible:outline-color_accent
        focus-visible:outline-offset-2"
        name={name}
        type={type}
        value={value}
        onChange={textChangeHandler}
        required={required}
      />
    </div>
  )

  const textareaElement = (
    <div className="grid-rows-[1fr auto] grid min-h-[150px] w-full">
      {label && <Label content={label} elemTitle={name} />}
      <textarea
        className={`h-[115px] min-h-[115px] w-full resize-y rounded bg-color_6 p-2 text-color_4`}
        name={name}
        value={value}
        onChange={textChangeHandler}
        rows={5}
        cols={30}
        required={required}
      />
    </div>
  )

  let displayedInputElement
  switch (type) {
    case InputFieldTypesE.text:
      displayedInputElement = textElement
      break
    case InputFieldTypesE.textarea:
      displayedInputElement = textareaElement
      break
    default:
      displayedInputElement = textElement
  }

  return displayedInputElement
}

export default InputText
