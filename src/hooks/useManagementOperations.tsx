// Submit form handlers with logic
import { nanoid } from "nanoid"
import useForm from "./useForm"
import useClients from "./useClients"
import useProperty from "./useProperty"
import {
  ClientFormDataE,
  ClientItemI,
  ClientKeys,
  JobPositionsE,
  PropertyItemI,
  PropertyTypeE,
} from "../types/types"
import { updateDataArray } from "../utility/misc"
import { DATABASE_RESOURCES } from "../types/actionTypes"

const useFormHandlers = () => {
  // CONTEXTS
  const { formData } = useForm()
  const {
    clients,
    activeClient,
    dispatch: dispatchClients,
    REDUCER_ACTIONS_CLIENT,
  } = useClients()
  const {
    property,
    activeProperty,
    dispatch: dispatchProperty,
    REDUCER_ACTIONS_PROPERTY,
  } = useProperty()

  //
  // Create client - process and store data
  const createNewClient = (): void => {
    // process FormData extract basic client elements -> array of obj entries
    const clientFormValues = Object.entries(formData)
      .filter(([key]) =>
        Object.values(ClientFormDataE).includes(key as ClientFormDataE)
      )
      .map(([key, value]) => {
        return { [key]: value["value"] }
      })

    // process FormData extract properties related elements -> array of obj entries
    const propertiesFormValues = Object.entries(formData)
      .filter(
        ([key]) =>
          !Object.values(ClientFormDataE).includes(key as ClientFormDataE)
      )
      .map(([key, value]) => {
        return { [key]: value["value"] }
      })

    // convert client to clients storage complatible data
    const clientData: ClientItemI = clientFormValues.reduce(
      (acc: ClientItemI, item) => {
        const key: ClientKeys = Object.keys(item)[0] as ClientKeys
        const value = item[key]
        acc[key] = value

        return acc
      },
      {
        id: "",
        "full name": "",
        address: "",
        phone: "",
        note: "",
        position: JobPositionsE.CEO,
        properties: [],
      }
    )

    // convert property to clients storage compatible(property) data
    const propertiesData = propertiesFormValues.map((item) => {
      const key = Object.keys(item)[0]
      const value = item[key]

      return { id: key, value }
    })

    // define new client
    const newClient: ClientItemI = {
      ...clientData,
      id: nanoid(),
      properties: propertiesData,
    }

    const newClientsArray: ClientItemI[] = [...clients, newClient]

    // create client - update state
    dispatchClients({
      type: REDUCER_ACTIONS_CLIENT.CREATE_CLIENT,
      payload: { clients: newClientsArray },
    })
    // update clients in ls
    localStorage.setItem(
      DATABASE_RESOURCES.CLIENTS,
      JSON.stringify(newClientsArray)
    )
  }

  // Create property - process and store data
  const createNewProperty = (): void => {
    // process FormData extract property elements -> array of obj entries
    const propertyFormValues = Object.entries(formData).map(([key, value]) => {
      return { [key]: value["value"] }
    })

    // property data to update property storage
    const propertyData = propertyFormValues.reduce(
      (acc, item) => {
        const key = Object.keys(item)[0]
        const value = item[key]
        acc[key] = value

        return acc
      },
      {
        id: "",
        label: "",
        type: PropertyTypeE.text,
        required: false,
      }
    )

    // generate id for new property
    const propertyID = nanoid()

    // define new client
    const newProperty: PropertyItemI = {
      ...propertyData,
      id: propertyID,
    } as PropertyItemI

    //
    const newPropertiesArray = [...property, newProperty]

    // create client - update state
    dispatchProperty({
      type: REDUCER_ACTIONS_PROPERTY.CREATE_PROPERTY,
      payload: { property: newPropertiesArray },
    })

    // update properties in ls
    localStorage.setItem(
      DATABASE_RESOURCES.PROPERTIES,
      JSON.stringify(newPropertiesArray)
    )

    // update all existing client's properties with new property assigned to client entry's properties
    const updatedClients: ClientItemI[] = clients?.map((client) => ({
      ...client,
      properties: [...client.properties, { id: propertyID, value: "" }],
    }))

    // store updated clients state
    dispatchClients({
      type: REDUCER_ACTIONS_CLIENT.UPDATE_CLIENT,
      payload: { clients: updatedClients },
    })
    // update clients in ls
    localStorage.setItem(
      DATABASE_RESOURCES.CLIENTS,
      JSON.stringify(updatedClients)
    )
  }

  // Updating existing client
  const updateExistingClient = () => {
    // process FormData extract basic client elements -> array of obj entries
    const clientFormValues = Object.entries(formData)
      .filter(([key]) =>
        Object.values(ClientFormDataE).includes(key as ClientFormDataE)
      )
      .map(([key, value]) => {
        return { [key]: value["value"] }
      })

    // process FormData extract properties related elements -> array of obj entries
    const propertiesFormValues = Object.entries(formData)
      .filter(
        ([key]) =>
          !Object.values(ClientFormDataE).includes(key as ClientFormDataE)
      )
      .map(([key, value]) => {
        return { [key]: value["value"] }
      })

    // convert client to clients storage complatible data
    const clientData: ClientItemI = clientFormValues.reduce(
      (acc: ClientItemI, item) => {
        const key: ClientKeys = Object.keys(item)[0] as ClientKeys
        const value = item[key]
        acc[key] = value

        return acc
      },
      {
        id: "",
        "full name": "",
        address: "",
        phone: "",
        note: "",
        position: JobPositionsE.CEO,
        properties: [],
      }
    )

    // convert property to clients storage compatible(property) data
    const propertiesData = propertiesFormValues.map((item) => {
      const key = Object.keys(item)[0]
      const value = item[key]

      return { id: key, value }
    })

    // define new client
    const updatedClient: ClientItemI = {
      ...clientData,
      id: activeClient.id,
      properties: propertiesData,
    }

    const updatedClients = updateDataArray(
      clients,
      updatedClient
    ) as ClientItemI[]

    // store updated client
    dispatchClients({
      type: REDUCER_ACTIONS_CLIENT.UPDATE_CLIENT,
      payload: { clients: updatedClients },
    })
    // update clients in ls
    localStorage.setItem(
      DATABASE_RESOURCES.CLIENTS,
      JSON.stringify(updatedClients)
    )
  }

  // Update existing property
  const updateExistingProperty = (): void => {
    // process FormData extract property elements -> array of obj entries
    const propertyFormValues = Object.entries(formData).map(([key, value]) => {
      return { [key]: value["value"] }
    })

    // property data to update property storage
    const propertyData = propertyFormValues.reduce(
      (acc, item) => {
        const key = Object.keys(item)[0]
        const value = item[key]
        acc[key] = value

        return acc
      },
      {
        id: "",
        label: "",
        type: PropertyTypeE.text,
        required: false,
      }
    )

    // define new client
    const updatedProperty: PropertyItemI = {
      ...(propertyData as PropertyItemI),
      id: activeProperty.id,
    }

    const updatedProperties: PropertyItemI[] = updateDataArray(
      property,
      updatedProperty
    ) as PropertyItemI[]

    dispatchProperty({
      type: REDUCER_ACTIONS_PROPERTY.UPDATE_PROPERTY,
      payload: { property: updatedProperties },
    })

    // update properties in ls
    localStorage.setItem(
      DATABASE_RESOURCES.PROPERTIES,
      JSON.stringify(updatedProperties)
    )
  }

  return {
    createNewClient,
    createNewProperty,
    updateExistingClient,
    updateExistingProperty,
  }
}

export default useFormHandlers
