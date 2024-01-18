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
    <div className="flex justify-center w-full h-[70px]">
      <label className="flex items-center h-full">
        {label && label}
      </label>
      <input
        className="p-1 rounded w-[25px] h-[25px] mx-4 my-auto"
        type="checkbox"
        checked={required ? required : checkValue}
        onChange={handleCheckboxChange}
        disabled={required ? required : readOnly}
      />
    </div>
  );
};

export default Checkbox;