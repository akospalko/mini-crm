// Reusable state setter to update form data value field
// Used for checkbox and dropdown handlers

import useForm from './useForm';
import {JobPositionsE} from '../types/types';

const useUpdateFormDataValue = () => {
  // HOOK
  const {setFormData} = useForm();

  // UTIL
  const updateFormDataValue = (key: string, newValue: JobPositionsE | boolean) => {
    setFormData((prevState) => {
      const newStateCopy = JSON.parse(JSON.stringify(prevState));
      newStateCopy[key].value = newValue;
      return newStateCopy;
    });
  };
  
  return updateFormDataValue;
}

export default useUpdateFormDataValue;