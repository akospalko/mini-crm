// TODO: textarea for Note field
// Reusable input field with various types
import {
  JobPositionsE,
  InputFieldTypesE,
  MultiTypeInputPropsI,
} from "../../types/types";
import Dropdown from "./Dropdown";
import InputText from "./InputText";
import Checkbox from "./Checkbox";
import DatePicker from "./DatePicker";

const MultiTypeInput = ({
  name,
  label,
  type,
  value,
  options,
  required,
}: MultiTypeInputPropsI) => {
  // HANDLER
  // Get input field based on type
  let inputField;
  switch (type) {
    case InputFieldTypesE.text:
    case InputFieldTypesE.textarea:
      inputField = (
        <InputText
          type={type}
          name={name}
          label={label}
          value={value as string}
          required={required}
        />
      );
      break;
    case InputFieldTypesE.date:
      inputField = (
        <DatePicker
          name={name}
          value={value as string}
          label={label}
          required={required}
        />
      );
      break;
    case InputFieldTypesE.dropdown:
      inputField = (
        <Dropdown
          name={name}
          label={label}
          options={options}
          value={value as JobPositionsE}
        />
      );
      break;
    case InputFieldTypesE.checkbox:
    case InputFieldTypesE.boolean: // Same as checkbox -> replace boolean with checkbox
      inputField = (
        <Checkbox
          name={name}
          label={label}
          checkValue={value as boolean}
          required={required}
        />
      );
      break;
    default:
      throw new Error(`text["error-unknown-action-type"]: ${type}`);
  }

  return inputField;
};

export default MultiTypeInput;
