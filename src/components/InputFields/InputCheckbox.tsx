import useForm from "../../hooks/useForm";
import { CheckboxPropsI } from "../../types/types";

const InputCheckbox = ({
  name,
  label,
  value = false,
  readOnly = false,
  required = false,
}: CheckboxPropsI) => {
  // CONTEXT
  const { setFormData } = useForm();

  // HANDLER
  const checkboxChangeHandler = () => {
    setFormData((prevState) => {
      const prevStateCopy = JSON.parse(JSON.stringify(prevState));
      prevStateCopy[name].value = !value;
      return prevStateCopy;
    })
  };

  return (
    <div
      title={name}
      className="flex h-[75px] w-[200px] items-center justify-center self-center truncate"
    >
      {label && (
        <label className="mr-2 w-[150px] truncate capitalize">{label}</label>
      )}
      <input
        className="flex h-[30px] w-[30px] rounded focus-visible-style"
        type="checkbox"
        checked={required ? true : value}
        onChange={checkboxChangeHandler}
        disabled={required ? true : readOnly}
      />
    </div>
  )
}

export default InputCheckbox