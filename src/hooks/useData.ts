import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useDebounce } from "./useDebounce";
import { searchPlace } from "../API/nominatim";

export const useData = (value: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<NS_GEODATA.IPlaceDTO[]>([]);
  const [error, setError] = useState(false);
  const debouncedFilter = useDebounce(value, 300);
  const lastSearchCall = useRef(0);

  useEffect(
    () => {
      setLoading(true);
      setError(false);
      
      lastSearchCall.current = Date.now();

      searchPlace(debouncedFilter, lastSearchCall.current)
        .then((searchResult) => {
          if (lastSearchCall.current > searchResult.time) return;
          setData(searchResult.data as NS_GEODATA.IPlaceDTO[]);
          setLoading(false);
          setError(false);
        })
        .catch((error) => {
          toast.error("Network error please retry");
          setError(true);
        });
    },
    [debouncedFilter] // Only call effect if debounced search term changes
  );
  return { loading, data };
};
