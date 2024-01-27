// Reusable Checkbox component
import useUpdateFormDataValue from "../../hooks/useUpdateFormDataValue"
import { CheckboxPropsI } from "../../types/types"

const Checkbox = ({
  name,
  label,
  checkValue,
  readOnly,
  required,
}: CheckboxPropsI) => {
  // HOOK
  const updateFormDataValue = useUpdateFormDataValue()

  // HANDLER
  const handleCheckboxChange = () => {
    updateFormDataValue(name, !checkValue)
  }

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
        checked={required ? required : checkValue}
        onChange={handleCheckboxChange}
        disabled={required ? required : readOnly}
      />
    </div>
  )
}

export default Checkbox
