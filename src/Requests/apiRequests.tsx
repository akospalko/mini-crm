import { HTTP_METHOD } from "../types/actionTypes"
import axiosInstance from "./axiosInstance"
import { AxiosResponse, AxiosError } from "axios"
import { ClientItemI, PropertyItemI } from "../types/types"

// INTERFACES
interface ApiRequestResultI {
  // loading: boolean
  responseData: ClientItemI[] | PropertyItemI[] | null // data resulting from the axios request
  error: string | null
  status: number
}

interface ApiRequestI {
  (
    method: HTTP_METHOD,
    url: string,
    data: ClientItemI[] | PropertyItemI[]
  ): Promise<ApiRequestResultI>
}

// GENERAL REQUEST
const apiRequest: ApiRequestI = async (
  method: HTTP_METHOD,
  url: string,
  data: ClientItemI[] | PropertyItemI[]
) => {
  try {
    const response: AxiosResponse = await axiosInstance({ method, url, data })
    console.log(response)
    return {
      responseData: response.data || [],
      error: null,
      status: response.status,
    }
  } catch (error: unknown) {
    if (error instanceof Error || error instanceof AxiosError) {
      return {
        // loading,
        responseData: null || [],
        error: `${method} request failed: ${error.message}`,
        status: 500,
      }
    }
    throw new Error("Unknown error occurred")
  }
}

// CLIENT REQUESTS
export const getAllClients = async (): Promise<ApiRequestResultI> => {
  try {
    return await apiRequest(HTTP_METHOD.GET, "/clients", [])
  } catch (error) {
    console.error("Error fetching all clients:", error)
    throw error
  }
}

export const getClientById = async (id: string): Promise<ApiRequestResultI> => {
  try {
    return await apiRequest(HTTP_METHOD.GET, `/clients/${id}`, [])
  } catch (error) {
    console.error("Error fetching client:", error)
    throw error
  }
}

export const createClient = async (
  userData: ClientItemI[] | PropertyItemI[]
): Promise<ApiRequestResultI> => {
  try {
    return apiRequest(HTTP_METHOD.POST, "/clients", userData)
  } catch (error) {
    console.error("Error creating clients:", error)
    throw error
  }
}

export const updateClient = async (
  id: string,
  updatedData: ClientItemI[]
): Promise<ApiRequestResultI> => {
  try {
    return apiRequest(HTTP_METHOD.PUT, `/clients/${id}`, updatedData)
  } catch (error) {
    console.error("Error updating client:", error)
    throw error
  }
}

export const deleteClient = async (id: string): Promise<ApiRequestResultI> => {
  try {
    return apiRequest(HTTP_METHOD.DELETE, `/clients/${id}`, [])
  } catch (error) {
    console.error("Error deleting client:", error)
    throw error
  }
}

// PROPERTY REQUESTS
export const getAllProperties = async (): Promise<ApiRequestResultI> => {
  try {
    return apiRequest(HTTP_METHOD.GET, "/property", [])
  } catch (error) {
    console.error("Error fetching all properties:", error)
    throw error
  }
}

export const getPropertyById = async (
  id: string
): Promise<ApiRequestResultI> => {
  try {
    return apiRequest(HTTP_METHOD.GET, `/property/${id}`, [])
  } catch (error) {
    console.error("Error fetching property:", error)
    throw error
  }
}

export const createProperty = async (
  userData: ClientItemI[] | PropertyItemI[]
): Promise<ApiRequestResultI> => {
  try {
    return apiRequest(HTTP_METHOD.POST, "/property", userData)
  } catch (error) {
    console.error("Error creating property:", error)
    throw error
  }
}

export const updateProperty = async (
  id: string,
  updatedData: ClientItemI[] | PropertyItemI[]
): Promise<ApiRequestResultI> => {
  try {
    return apiRequest(HTTP_METHOD.PUT, `/property/${id}`, updatedData)
  } catch (error) {
    console.error("Error creating property:", error)
    throw error
  }
}

export const deleteProperty = async (
  id: string
): Promise<ApiRequestResultI> => {
  try {
    return apiRequest(HTTP_METHOD.DELETE, `/property/${id}`, [])
  } catch (error) {
    console.error("Error deleting property:", error)
    throw error
  }
}
