import { HTTP_METHOD } from "../types/actionTypes"
import axiosInstance from "./axiosInstance"
import { AxiosResponse, AxiosError } from "axios"

// INTERFACES
interface ApiRequestResultI {
  loading: boolean
  responseData: string[] | null // data resulting from the axios request // TODO: ADD PROPER TYPE
  error: string | null
  status: number
}

interface ApiRequestI {
  (
    method: HTTP_METHOD,
    url: string,
    data: string[] | null
  ): Promise<ApiRequestResultI>
}

// GENERAL REQUEST
const apiRequest: ApiRequestI = async (
  method: HTTP_METHOD,
  url: string,
  data: string[] | null
) => {
  let loading: boolean = true
  try {
    const response: AxiosResponse = await axiosInstance({ method, url, data })
    return {
      loading: false,
      responseData: response.data,
      error: null,
      status: response.status,
    }
  } catch (error: unknown) {
    loading = false
    if (error instanceof Error || error instanceof AxiosError) {
      return {
        loading,
        responseData: null,
        error: `${method} request failed: ${error.message}`,
        status: 500,
      }
    }
    throw new Error("Unknown error occurred")
  }
}

// CLIENT REQUESTS
export const getAllClients = async (): Promise<ApiRequestResultI> => {
  return apiRequest(HTTP_METHOD.GET, "/client", null)
}

export const getClientById = async (id: string): Promise<ApiRequestResultI> => {
  return apiRequest(HTTP_METHOD.GET, `/client/${id}`, null)
}

export const createClient = async (
  userData: string[]
): Promise<ApiRequestResultI> => {
  return apiRequest(HTTP_METHOD.POST, "/client", userData)
}

export const updateClient = async (
  id: string,
  updatedData: // TODO: ADD PROPER TYPE
): Promise<ApiRequestResultI> => {
  return apiRequest(HTTP_METHOD.PUT, `/client/${id}`, updatedData)
}

export const deleteClient = async (id: string): Promise<ApiRequestResultI> => {
  return apiRequest(HTTP_METHOD.DELETE, `/client/${id}`, null)
}

// PROPERTY REQUESTS
export const getAllProperties = async (): Promise<ApiRequestResultI> => {
  return apiRequest(HTTP_METHOD.GET, "/property", null)
}

export const getPropertyById = async (id: string): Promise<ApiRequestResultI> => {
  return apiRequest(HTTP_METHOD.GET, `/property/${id}`, null)
}

export const createProperty = async (
  userData: string[] // TODO: ADD PROPER TYPE
): Promise<ApiRequestResultI> => {
  return apiRequest(HTTP_METHOD.POST, "/property", userData)
}

export const updateProperty = async (
  id: string,
  updatedData // TODO: ADD PROPER TYPE
): Promise<ApiRequestResultI> => {
  return apiRequest(HTTP_METHOD.PUT, `/property/${id}`, updatedData)
}

export const deleteProperty = async (id: string): Promise<ApiRequestResultI> => {
  return apiRequest(HTTP_METHOD.DELETE, `/property/${id}`, null)
}
