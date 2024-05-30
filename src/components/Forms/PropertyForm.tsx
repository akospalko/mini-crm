// Reusable form component
// TODO: Fix type
// TODO: Fix enum name -> edit to update
import {
  DropdownFormFieldI,
  InputFieldTypesE,
  FormPropsI,
  PropertyItemI,
  JobPositionsE
} from "../../types/types";
import { ACTIVE_MENU_ACTION_TYPE } from "../../types/actionTypes";
import useForm from "../../hooks/useForm";
import useToggleMenu from "../../hooks/useToggleMenu";
import text from "../../data/text.json";
import testID from "../../data/data_test_id.json";
import {
  createProperty,
  updateProperty,
  getAllProperties,
  getEditPropertyTemplate
} from "../../Requests/apiRequests";
import { FormEvent } from "react";
import useProperty from "../../hooks/useProperty";
import { processFormData } from "../../utility/misc";
import MultiTypeInput from "../UI/MultiTypeInput";
import InputText from "../UI/InputText";
import InputNumber from "../UI/InputNumber";
import Checkbox from "../UI/Checkbox";
import Dropdown from "../UI/Dropdown";

const PropertyForm = ({ action }: FormPropsI) => {
  // CONTEXT
  const { toggleModal } = useToggleMenu(); // TODO: add type - setupMenuHandler
  const { formData, setFormData } = useForm();
  const { dispatch: dispatchProperty, REDUCER_ACTIONS_PROPERTY, activeProperty } = useProperty();

  console.log(formData["type"].value);
  
  // Handlers
  const createPropertyHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    await createProperty(processFormData(formData));
    const { responseData } = await getAllProperties();
    dispatchProperty({
      type: REDUCER_ACTIONS_PROPERTY.UPDATE_PROPERTY,
      payload: { property: responseData as PropertyItemI[] },
    });

    // TODO: Successful creation -> show edit property menu
    toggleModal(false);
  };

  // Submit form, update existing property
  const updatePropertyHandler = async (
    e: FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();

    await updateProperty(id, processFormData(formData));
    const { responseData } = await getAllProperties();

    dispatchProperty({
      type: REDUCER_ACTIONS_PROPERTY.UPDATE_PROPERTY,
      payload: { property: responseData as PropertyItemI[] },
    });
  };

  // Layout
  // Determine the active handler based on the action prop
  let activeHandler: (
    e: FormEvent<HTMLFormElement>,
    data: any
  ) => Promise<void> = async (e, data) => {};

  switch (action) {
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
      {/* Label */}
      <InputText
        type={formData["label"].type}
        name="label"
        label={formData["label"].label}
        value={formData["label"].value as string}
        required={formData["label"].required}
      />
      {/* Type */}
       <Dropdown
        name="type"
        label={formData.type.label}
        options={formData.type.options}
        value={formData.type.value}
      />
      {/* Min & Max (optional) */}
      { formData["type"].value === "text" || formData["type"].value === "textarea" ?
        ( 
          <>
            <InputNumber
              type={formData["min"].type}
              name="min"
              label={formData["min"].label}
              value={formData["min"].value}
              required={formData["min"].required}
            />
            <InputNumber
              type={formData["max"].type}
              name="max"
              label={formData["max"].label}
              value={formData["max"].value}
              required={formData["max"].required}
            />
          </>
        ) : null
      }
      {/* Required */}
      <Checkbox
        // name={formData["required"]}
        label={formData["required"].label}
        checkValue={formData["required"].value}
        required={formData["required"].required}
      />
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

export default PropertyForm;