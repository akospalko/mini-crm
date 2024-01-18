// Reusable form component 
import MultiTypeInput from "./MultiTypeInput";
import {DropdownFormFieldI, InputFieldTypesE} from "../../types/types";
import {ACTIVE_MENU_ACTION_TYPE } from "../../types/actionTypes";
import useForm from "../../hooks/useForm";
import useManagementOperations from "../../hooks/useManagementOperations";
import useToggleMenu from "../../hooks/useToggleMenu";

interface FormPropsI {
  action: ACTIVE_MENU_ACTION_TYPE
}

const Form = ({action}: FormPropsI) => {
  // CONTEXT
  const {toggleModal} = useToggleMenu();
  const {formData} = useForm();

  // HOOK
  const {createNewClient, createNewProperty, updateExistingClient, updateExistingProperty} = useManagementOperations();

  // HANDLERS
  // Generic form submission handler
  const genericFormSubmitHandler = (
    e: React.FormEvent<HTMLFormElement>, 
    submitHandler: () => void
  ): void => {
    e.preventDefault();
    submitHandler();
    toggleModal(false);
  };

  // Submit form for creating new client 
  const createClientHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    genericFormSubmitHandler(e, createNewClient);
  };

   // Submit form, update existing client
   const editClientHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    genericFormSubmitHandler(e, updateExistingClient);
  };

  // Submit form, create new property
  const createPropertyHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    genericFormSubmitHandler(e, createNewProperty);
  };

  // Submit form, update existing property
  const editPropertyHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    genericFormSubmitHandler(e, updateExistingProperty);
  };

  // Determine the active handler based on the action prop
  let activeHandler;
  switch (action) {
    case ACTIVE_MENU_ACTION_TYPE.CREATE_CLIENT:
      activeHandler = createClientHandler;
      break;
    case ACTIVE_MENU_ACTION_TYPE.EDIT_CLIENT:
      activeHandler = editClientHandler;
      break;
    case ACTIVE_MENU_ACTION_TYPE.CREATE_PROPERTY:
      activeHandler = createPropertyHandler;
      break;
    case ACTIVE_MENU_ACTION_TYPE.EDIT_PROPERTY:
      activeHandler = editPropertyHandler;
      break;
    default:
      throw new Error(`Undefined form submit handler ${action}. Provide proper action type!`);
  }

  return (
    <form 
      className="flex flex-1 w-full flex-col gap-2"
      onSubmit={activeHandler}
    >
      {Object.keys(formData).map((item: string) => {
        return (
          <MultiTypeInput 
            key={item}
            name={item}
            type={formData[item].type}
            label={formData[item].label}
            options={formData[item].type === InputFieldTypesE.dropdown ? (formData[item] as DropdownFormFieldI).options : []}
            value={formData[item].value}
            required={formData[item].required} 
          />
        )
      })}
      <div className="flex w-full my-8">
        <button 
          className="w-[100px] h-[50px] bg-gray-700 mx-auto rounded"
          type="submit"
        >Submit</button>
      </div>
    </form>
  )
}

export default Form;