// TODO: Fix type
// TODO: Fix update client functionality
// TODO: Fix enum name -> edit to update
// Reusable form component
import MultiTypeInput from "./MultiTypeInput";
import {
  DropdownFormFieldI,
  InputFieldTypesE,
  FormPropsI,
  ClientItemCreateI,
} from "../../types/types";
import { ACTIVE_MENU_ACTION_TYPE } from "../../types/actionTypes";
import useForm from "../../hooks/useForm";
import useManagementOperations from "../../hooks/useManagementOperations";
import useToggleMenu from "../../hooks/useToggleMenu";
import text from "../../data/text.json";
import testID from "../../data/data_test_id.json";
import {
  createClient,
  updateClient,
  createProperty,
  updateProperty,
  getAllClients,
} from "../../Requests/apiRequests";
import { FormEvent } from "react";
import useProperty from "../../hooks/useProperty";

const Form = ({ action }: FormPropsI) => {
  // CONTEXT
  const { toggleModal } = useToggleMenu();
  const { formData } = useForm();
  const { activeProperty } = useProperty();

  // HOOK
  const {
    createNewClient,
    createNewProperty,
    updateExistingClient,
    updateExistingProperty,
  } = useManagementOperations();

  // OLD
  // Submit form for creating new client
  // TODO: client's property data are not displaying properly
  const createClientHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    // genericFormSubmitHandler(e, createNewClient); // delete generic form submit handler
    // TODO:
    const clientData: ClientItemCreateI = createNewClient(); // TODO: Rename createNewClient() ->
    // POST REQUEST
    await createClient(clientData);
    // await getAllClients();
    // toggleModal(false);
  };

  // Submit form, create new property
  const createPropertyHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    // genericFormSubmitHandler(e, createNewProperty);
    const clientPropertyData = createNewProperty(); // TODO: Rename
    await createProperty(clientPropertyData);
    // TODO: Successful creation -> show property menu
    toggleModal(false);
  };

  // ---------- NEW ----------
  // Submit form, update existing property
  const updatePropertyHandler = async (
    e: FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    try {
      if (!id || typeof id !== "string") {
        throw new Error(`Invalid id: ${id}`);
      }
      if (id.charAt(0) !== "p") {
        throw new Error(`Wrong id type: ${id}`);
      }
      // genericFormSubmitHandler(e, updateExistingProperty);
      const updatedPropertyData = updateExistingProperty();
      await updateProperty(id, updatedPropertyData);
      // toggleModal(false);
    } catch (error) {
      throw new Error(`Error updating property (${id}):`, error);
    }
  };

  // Layout
  // Determine the active handler based on the action prop
  let activeHandler: (
    e: FormEvent<HTMLFormElement>,
    data: any
  ) => Promise<void> = async (e, data) => {};

  switch (action) {
    case ACTIVE_MENU_ACTION_TYPE.CREATE_CLIENT:
      // TODO:
      activeHandler = async (e) => await createClientHandler(e);
      break;
    case ACTIVE_MENU_ACTION_TYPE.EDIT_CLIENT:
      // TODO:
      // activeHandler = async () => await createClientHandler();
      break;
    case ACTIVE_MENU_ACTION_TYPE.CREATE_PROPERTY:
      activeHandler = async (e) => createPropertyHandler(e);
      break;
    case ACTIVE_MENU_ACTION_TYPE.EDIT_PROPERTY:
      activeHandler = async (e) => updatePropertyHandler(e, activeProperty.id);

      break;
    default:
      throw new Error(`${text["error-unknown-action-type"]} ${action}`);
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
  );
};

export default Form;
