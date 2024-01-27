// Reusable form component
import MultiTypeInput from "./MultiTypeInput"
import { DropdownFormFieldI, InputFieldTypesE } from "../../types/types"
import { ACTIVE_MENU_ACTION_TYPE } from "../../types/actionTypes"
import useForm from "../../hooks/useForm"
import useManagementOperations from "../../hooks/useManagementOperations"
import useToggleMenu from "../../hooks/useToggleMenu"
import text from "../../data/text.json"
import testID from "../../data/data_test_id.json"

interface FormPropsI {
  action: ACTIVE_MENU_ACTION_TYPE
}

const Form = ({ action }: FormPropsI) => {
  // CONTEXT
  const { toggleModal } = useToggleMenu()
  const { formData } = useForm()

  // HOOK
  const {
    createNewClient,
    createNewProperty,
    updateExistingClient,
    updateExistingProperty,
  } = useManagementOperations()

  // HANDLERS
  // Generic form submission handler
  const genericFormSubmitHandler = (
    e: React.FormEvent<HTMLFormElement>,
    submitHandler: () => void
  ): void => {
    e.preventDefault()
    submitHandler()
    toggleModal(false)
  }

  // Submit form for creating new client
  const createClientHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    genericFormSubmitHandler(e, createNewClient)
  }

  // Submit form, update existing client
  const editClientHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    genericFormSubmitHandler(e, updateExistingClient)
  }

  // Submit form, create new property
  const createPropertyHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    genericFormSubmitHandler(e, createNewProperty)
  }

  // Submit form, update existing property
  const editPropertyHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    genericFormSubmitHandler(e, updateExistingProperty)
  }

  // Determine the active handler based on the action prop
  let activeHandler
  switch (action) {
    case ACTIVE_MENU_ACTION_TYPE.CREATE_CLIENT:
      activeHandler = createClientHandler
      break
    case ACTIVE_MENU_ACTION_TYPE.EDIT_CLIENT:
      activeHandler = editClientHandler
      break
    case ACTIVE_MENU_ACTION_TYPE.CREATE_PROPERTY:
      activeHandler = createPropertyHandler
      break
    case ACTIVE_MENU_ACTION_TYPE.EDIT_PROPERTY:
      activeHandler = editPropertyHandler
      break
    default:
      throw new Error(`${text["error-unknown-action-type"]} ${action}`)
  }

  return (
    <form
      data-testid={testID["form-element"]}
      onSubmit={activeHandler}
      className="flex w-full flex-1 flex-col gap-5"
    >
      {Object.keys(formData).map((item: string) => (
        <MultiTypeInput
          key={item}
          name={item}
          type={formData[item].type}
          label={formData[item].label}
          options={
            formData[item].type === InputFieldTypesE.dropdown
              ? (formData[item] as DropdownFormFieldI).options
              : []
          }
          value={formData[item].value}
          required={formData[item].required}
        />
      ))}
      <div
        data-testid={testID["form-button-container"]}
        className="my-4 flex w-full"
      >
        <button
          data-testid={testID["button-form-submit"]}
          className="m-auto h-[60px] w-[160px] rounded bg-color_accent text-xl font-medium hover:bg-color_accent_secondary focus:outline-none
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color_accent lg:h-[50px] lg:w-[125px]"
          type="submit"
        >
          <span className="font-roboto text-lg font-medium text-color_1">
            {text["submit"]}
          </span>
        </button>
      </div>
    </form>
  )
}

export default Form
