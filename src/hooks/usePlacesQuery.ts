import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDebounce } from "./useDebounce";
import { searchPlace } from "../api/nominatim";

export const usePlacesQuery = (value: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [places, setPlaces] = useState<NS_GEODATA.IPlaceDTO[]>([]);
  //const to manage the debounced value
  const debouncedValue = useDebounce(value, 300);
  //ref to save the last time call to the end point
  const lastSearchCall = useRef(0);

  useEffect(
    () => {      
      async function fetchData () {
        try{
          setLoading(true);
          lastSearchCall.current = Date.now();
          const searchResult = await searchPlace(debouncedValue, lastSearchCall.current);
          setLoading(false);
          if (lastSearchCall.current > searchResult.time) return; //ignore past search calls
          setPlaces(searchResult.data);
          
          
        } catch(error){
          toast.error("Oops ! An error has occured : " +error.message);
        }
      }
      fetchData();      
    },
    [debouncedValue] // Only call effect if debounced search term changes
  );

  return { loading, places };
};
