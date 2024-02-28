// Reusable hook to fetch resources from api endpoints
// TODO: CACHE fetched data???
// TODO: MAKE REUSABLE
// TODO: USE AXIOS TO FETCH -> ADD reusale fetch

import { useState, useEffect } from "react"
import { ClientItemI, PropertyItemI } from "../types/types"
import text from "../data/text.json"

const useFetchResources = () => {
  // STATE
  const [data, setData] = useState<ClientItemI[] | PropertyItemI[]>([])
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // EFFECT
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        // Fetch data from the provided URL
        const response: Response = await fetch(
          "http://localhost:8001/api/v1/clients"
        )
        const fetchedData: ClientItemI[] | PropertyItemI[] =
          await response.json()

        setData(fetchedData)
        // setIsLoading(false);
      } catch (error) {
        console.error(text["error-fetching-data"], error)
      } finally {
        // setIsLoading(false);
      }
    }

    fetchData()
  }, [])

  return { data }
}

export default useFetchResources
