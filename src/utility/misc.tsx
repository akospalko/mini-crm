// Miscellaneous utils
import {
  ClientItemI,
  PropertyItemI,
  ClientFormTemplateI,
  PopulateFormDataWithActiveClientI,
  PropertyFormTemplateI,
} from "../types/types"

// Find clicked item in an array of items for Clients and Properties
export const findActiveArrayItem = (
  itemID: string,
  data: (ClientItemI | PropertyItemI)[]
): ClientItemI | PropertyItemI => {
  const filteredItem: ClientItemI | PropertyItemI =
    data?.find((item) => itemID === item.id) ??
    ({} as ClientItemI | PropertyItemI)

  return filteredItem
}

// Remove item from array return new array
export const deleteItemByID = (
  itemID: string,
  data: ClientItemI[] | PropertyItemI[]
): ClientItemI[] | PropertyItemI[] => {
  const filteredArray = data.filter(
    (item: ClientItemI | PropertyItemI) => item.id !== itemID
  ) as ClientItemI[] | PropertyItemI[]

  return filteredArray
}

// Populate form data with active item's data
export const populateFormWithActiveData = (
  activeData: PropertyItemI | PopulateFormDataWithActiveClientI,
  formTemplate: ClientFormTemplateI | PropertyFormTemplateI
) => {
  const populatedForm = { ...formTemplate }

  if (activeData) {
    Object.keys(populatedForm).forEach((key) => {
      const typedKey = key as keyof (
        | PropertyItemI
        | PopulateFormDataWithActiveClientI
      )

      if (activeData[typedKey] !== undefined && activeData[typedKey] !== null) {
        populatedForm[typedKey].value = activeData[typedKey] as string | boolean
      }
    })
  }

  return populatedForm
}

// Update data array with the provided (e.g. updated) obj: used for clients and properties
export const updateDataArray = (
  originalArray: ClientItemI[] | PropertyItemI[],
  updatedObject: ClientItemI | PropertyItemI
): ClientItemI[] | PropertyItemI[] => {
  const updatedArray = originalArray.map((item) => {
    if (item.id === updatedObject.id) {
      // if the ids match, replace the item with the updated object
      return updatedObject
    }
    return item
  }) as ClientItemI[] | PropertyItemI[]

  return updatedArray
}

// Format obj keys to labels
export const objKeysToLabels = (
  input: string,
  capitalize?: boolean
): string => {
  let formattedText = input.replace(/_/g, " ").trim()
  if (capitalize) {
    formattedText = formattedText.replace(/\b\w/g, (firstLetter) =>
      firstLetter.toUpperCase()
    )
  }
  return formattedText
}
