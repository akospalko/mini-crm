// Fetch data from local storage(if available) or url 
import {useState, useEffect} from 'react';
import {DATABASE_RESOURCES} from '../types/actionTypes';
import {ClientItemI, PropertyItemI} from '../types/types';
import text from "../data/text.json";

const useLocalStorageAndFetch = (resource: DATABASE_RESOURCES) => {
  // STATE
  const [data, setData] = useState<ClientItemI[] | PropertyItemI[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // EFFECT
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        // check if data is available in local storage
        const storedDataString : string | null = localStorage.getItem(resource);
        const storedData: ClientItemI[] | PropertyItemI[] | null = storedDataString ? JSON.parse(storedDataString) : null;
        
        if (storedData) {
          setData(storedData);
          // setIsLoading(false);
        } else {
          // Fetch data from the provided URL
          const response: Response = await fetch(`http://localhost:3500/${resource}`);
          const fetchedData: ClientItemI[] | PropertyItemI[] = await response.json();

          // store data in local storage
          localStorage.setItem(resource, JSON.stringify(fetchedData));

          setData(fetchedData);
          // setIsLoading(false);
        }
      } catch (error) {
          console.error(text["error-fetching-data"], error);
      } finally {
        // setIsLoading(false);
      }
    };
  
    fetchData();
  }, [resource]);

  return {data};
};

export default useLocalStorageAndFetch;