// Client item for management page
import useForm from "../hooks/useForm";
import useFormDataTemplate from "../hooks/useFormDataTemplate";
import useProperty from "../hooks/useProperty";
import useToggleMenu from "../hooks/useToggleMenu";
import {ACTIVE_MENU_ACTION_TYPE} from "../types/actionTypes";
import {PropertyItemI} from "../types/types";
import {deleteItemByID, findActiveArrayItem, populateFormWithActiveData} from "../utility/misc";
import ManagementItemButton from "./UI/ManagementItemButton";
import {DeleteIcon, EditIcon} from "./UI/SVG";

// INTERFACE
interface PropertyCardPropsI {
  itemData: PropertyItemI
}

const PropertyManagementItem = ({itemData}: PropertyCardPropsI) => {
  // CONTEXT
  const {property, dispatch: dispatchProperty, REDUCER_ACTIONS_PROPERTY} = useProperty();
  const {toggleModal, menuContentChangeHandler} = useToggleMenu();
  const {setFormData} = useForm()
 
  // HOOK
  const {getPropertyFormTemplate} = useFormDataTemplate(); 

  // HANDLERS
  // Find client and open edit modal
  const updatePropertyHandler = (propertyID: string) => {
    // set up active menu content
    menuContentChangeHandler(ACTIVE_MENU_ACTION_TYPE.EDIT_PROPERTY);
    // find active property item
    const activeProperty: PropertyItemI = findActiveArrayItem(propertyID, property) as PropertyItemI;
    // update state
    dispatchProperty({
      type: REDUCER_ACTIONS_PROPERTY.UPDATE_ACTIVE_PROPERTY,
      payload: {activeProperty}
    });
    // get property form template
    const propertyFormTemplate = getPropertyFormTemplate();
    // populate form
    const populatedForm = populateFormWithActiveData(activeProperty, propertyFormTemplate);
    // update form state with populated data
    setFormData(populatedForm);
    // open modal
    toggleModal(true);
  }
  
  // Delete property from data storage
  const deletePropertyHandler = (itemID: string): void => {
    // filter data 
    const updatedProperty = deleteItemByID(itemID, property) as PropertyItemI[];
    // update state
    dispatchProperty({
      type: REDUCER_ACTIONS_PROPERTY.DELETE_PROPERTY,
      payload: {property: updatedProperty},
    });
  }

  // STYLE 
  const iconSize: string = "25px"; 
  const iconColor: string = "rgb(209 213 219)";
  
  return (
    <div className="bg-slate-500 rounded grid grid-cols-[1fr,50px,50px] grid-rows-1 grid-flow-col h-[50px] overflow-hidden"> 
      <span className="flex items-center p-2 h-full">{itemData.label}</span>
      <ManagementItemButton 
        changed={updatePropertyHandler} 
        itemID={itemData.id} 
        title="Edit"
      >
        <EditIcon
          width={iconSize}
          height={iconSize}
          fill={iconColor}
        />
      </ManagementItemButton>
      <ManagementItemButton 
        changed={deletePropertyHandler} 
        itemID={itemData.id} 
        title="Delete"
      >
        <DeleteIcon
          width={iconSize}
          height={iconSize}
          fill={iconColor}
        />
      </ManagementItemButton>
    </div>
  )
}

export default PropertyManagementItem;