// Define axios instance specifying the proper endpoints
import axios from "axios"
import { AxiosInstance } from "axios"

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8001/api/v1/", // TODO: Replace with hosted url
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance
