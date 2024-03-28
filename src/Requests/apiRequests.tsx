import { HTTP_METHOD } from "../types/actionTypes";
import axiosInstance from "./axiosInstance";
import { AxiosResponse, AxiosError } from "axios";
import { ClientItemI, ClientItemCreateI, PropertyItemI } from "../types/types";

// INTERFACES
interface ApiRequestResultI {
  // loading: boolean
  responseData:
    | ClientItemI
    | PropertyItemI
    | ClientItemI[]
    | PropertyItemI[]
    | null; // data resulting from the axios request
  error: string | null;
  status: number;
}

interface ApiRequestI {
  (
    method: HTTP_METHOD,
    url: string,
    data: (ClientItemI | ClientItemCreateI) | PropertyItemI
  ): Promise<ApiRequestResultI>;
}

// MAGIC VALUES
const emptyReqData = {} as (ClientItemI | ClientItemCreateI) | PropertyItemI; // cannot send null value as a payload to api, but reusability forces the fn to send a req data payload param

// GENERAL REQUEST
const apiRequest: ApiRequestI = async (
  method: HTTP_METHOD,
  url: string,
  data: (ClientItemI | ClientItemCreateI) | PropertyItemI
) => {
  console.log("starting axios req");
  try {
    console.log(JSON.stringify({ method, url, data }));
    const response: AxiosResponse = await axiosInstance({ method, url, data });
    console.log(response);
    return {
      responseData: response.data || [],
      error: null,
      status: response.status,
    };
  } catch (error: unknown) {
    if (error instanceof Error || error instanceof AxiosError) {
      return {
        // loading,
        responseData: null || [],
        error: `${method} request failed: ${error.message}`,
        status: 500,
      };
    }
    throw new Error("Unknown error occurred");
  }
};

// CLIENT REQUESTS
export const getAllClients = async (): Promise<ApiRequestResultI> => {
  try {
    return await apiRequest(HTTP_METHOD.GET, "/clients", emptyReqData);
  } catch (error) {
    console.error("Error fetching all clients:", error);
    throw error;
  }
};

export const getClientById = async (id: string): Promise<ApiRequestResultI> => {
  try {
    return await apiRequest(HTTP_METHOD.GET, `/clients/${id}`, emptyReqData);
  } catch (error) {
    console.error("Error fetching client:", error);
    throw error;
  }
};

export const createClient = async (
  // userData: ClientItemI[] | PropertyItemI[]
  userData: ClientItemCreateI | PropertyItemI
): Promise<ApiRequestResultI> => {
  try {
    return apiRequest(HTTP_METHOD.POST, "/clients", userData);
  } catch (error) {
    console.error("Error creating clients:", error);
    throw error;
  }
};

export const updateClient = async (
  id: string,
  updatedData: ClientItemI
): Promise<ApiRequestResultI> => {
  try {
    return apiRequest(HTTP_METHOD.PUT, `/clients/${id}`, updatedData);
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};

export const deleteClient = async (id: string): Promise<ApiRequestResultI> => {
  try {
    return await apiRequest(HTTP_METHOD.DELETE, `/clients/${id}`, emptyReqData);
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};

// PROPERTY REQUESTS
export const getAllProperties = async (): Promise<ApiRequestResultI> => {
  try {
    return await apiRequest(HTTP_METHOD.GET, "/properties", emptyReqData);
  } catch (error) {
    console.error("Error fetching all properties:", error);
    throw error;
  }
};

export const getPropertyById = async (
  id: string
): Promise<ApiRequestResultI> => {
  try {
    return await apiRequest(HTTP_METHOD.GET, `/properties/${id}`, emptyReqData);
  } catch (error) {
    console.error("Error fetching property:", error);
    throw error;
  }
};

export const createProperty = async (
  userData: ClientItemI | PropertyItemI
): Promise<ApiRequestResultI> => {
  try {
    return apiRequest(HTTP_METHOD.POST, "/properties", userData); // TODO PROPERTY DATA
  } catch (error) {
    console.error("Error creating property:", error);
    throw error;
  }
};

export const updateProperty = async (
  id: string,
  updatedData: ClientItemI | PropertyItemI
): Promise<ApiRequestResultI> => {
  try {
    return await apiRequest(
      HTTP_METHOD.PATCH,
      `/properties/${id}`,
      updatedData
    );
  } catch (error) {
    console.error("Error creating property:", error);
    throw error;
  }
};

export const deleteProperty = async (
  id: string
): Promise<ApiRequestResultI> => {
  try {
    return apiRequest(HTTP_METHOD.DELETE, `/properties/${id}`, emptyReqData);
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
};
