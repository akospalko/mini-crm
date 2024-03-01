// Define axios instance specifying the proper endpoints
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:8001/api/v1/",
  timeout: 5000, // Timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance
