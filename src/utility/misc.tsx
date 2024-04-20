// Miscellaneous utils

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

// Process form data for client and property (create / update) api requests
export const processFormData = (formData: any) => {
  const processedFormData:any = {};
  for (const key in formData) {
    if (formData.hasOwnProperty(key)) {
      const entry = formData[key]; 
      if (entry.hasOwnProperty("propertyId") && typeof entry.propertyId === "string" && entry.propertyId.trim() !== "") {
        processedFormData[key] = {
          propertyId: entry.propertyId,
          value: entry.value
        };
      } else {
        processedFormData[key] = entry.value;
      }
    }
  }
  return processedFormData;
}