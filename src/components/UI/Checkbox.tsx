// Reusable Checkbox component
import useUpdateFormDataValue from "../../hooks/useUpdateFormDataValue";

interface CheckboxPropsI {
  name: string,
  label?: string
  checkValue: boolean,
  readOnly?: boolean,
  required: boolean
}

const Checkbox = ({name, label, checkValue, readOnly, required}: CheckboxPropsI) => {
  // HOOK
  const updateFormDataValue = useUpdateFormDataValue();
  
  // HANDLER
  const handleCheckboxChange = () => {
    updateFormDataValue(name, !checkValue);
  };

  return (
      <div title={name} className="flex items-center justify-center self-center w-[200px] h-[75px] truncate">
        {label && <label className="w-[150px] mr-2 truncate capitalize">{label}</label>}
        <input
          className="flex w-[30px] h-[30px] rounded focus-visible-style"
          type="checkbox"
          checked={required ? required : checkValue}
          onChange={handleCheckboxChange}
          disabled={required ? required : readOnly}
        />
      </div>
  );
};

export default Checkbox;