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


// // Fetch and return data from provided resource or local storage 
// import {useEffect, useState} from 'react';
// import {ClientItemI, PropertyItemI} from '../types/types';
// import {DATABASE_RESOURCES} from '../types/actionTypes';

// const useFetchData = (resource: DATABASE_RESOURCES) => {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [status, setStatus] = useState<number | null>(null);
//   const [data, setData] = useState<ClientItemI[] | PropertyItemI[]>([]);

//   // URL
//   const url: string = `http://localhost:3500/${resource}`; 
  
//   // EFFECT
//   // Function to fetch data from local storage
//   useEffect(() => {
//---------------FETCH URL---------------
//     const fetchData = async (): Promise<void> => {
//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           setStatus(response.status);
//         } else {
//           const data: ClientItemI[] | PropertyItemI[] = await response.json();
//           setData(data);
//         }
//       } catch (error) {
//         setError(String(error));
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchDataFromLocalStorage = () => {
//       try {
//         const storedData = localStorage.getItem(resource);
//         if (storedData) {
//           const parsedData = JSON.parse(storedData);
//           setData(parsedData);
//         } else {
//           return [];
//         }
//       } catch (error) {
//         console.error('Error fetching data from local storage:', error);
//       }
//     };
  
//     // Fetch data only if not present or empty
//     fetchDataFromLocalStorage();
//     console.log(!data || !data.length, data)
//     if (!data || !data.length) {
//       console.log("ls data unavailable for", resource)
//       fetchData();
//     }
//     console.log("ls data is available for", resource)

//   }, []);

//   return {status, loading, data, error};
// };

// export default useFetchData;

// /*
// // GET DATA:  
// get lsData ->
//   check if ls data is available ->
//   ls data available: true -> update data state -> return ls data
  
//   ls data available: false -> fetch data from url -> update state -> return ls data

// // SET DATA:
// 1. context use effect when state.clients change 

// 2. with each dispatch where "clients" storage gets updated 
// */