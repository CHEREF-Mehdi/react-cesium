import * as React from "react";
import TextField from "@material-ui/core/TextField";
import { searchCity, IPlace } from "../../API/api";
import Grid from "@material-ui/core/Grid";
import Select from "react-select";
import { useDebounce } from "../../hooks";

export interface FormProps {
  selectedPlace: IPlace | undefined;
  setSelectedPlace: React.Dispatch<React.SetStateAction<IPlace | undefined>>;
}

let lastRequestTime = 0;

export const Form: React.FC<FormProps> = ({
  selectedPlace,
  setSelectedPlace,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<string>("");
  const [places, setPlaces] = React.useState<IPlace[]>([]);

  const debouncedFilter = useDebounce(filter, 300);

  // Effect for API call
  React.useEffect(
    () => {
      setLoading(true);
      lastRequestTime = Date.now();
      searchCity(debouncedFilter, lastRequestTime).then((res) => {
        if (lastRequestTime > res.time) return;
        setPlaces(res.data);
        setLoading(false);
      });
    },
    [debouncedFilter] // Only call effect if debounced search term changes
  );

  return (
    <>
      <Grid item xs={11}>
        <Select
          options={places.map((place) => ({
            value: place.place_id,
            label: place.display_name,
          }))}
          isLoading={loading}
          isClearable
          backspaceRemovesValue
          onInputChange={(newValue) => setFilter(newValue)}
          maxMenuHeight={150}
          onChange={(e) => {
            setSelectedPlace(places.find((p) => p.place_id === e?.value));
          }}
        />
      </Grid>

      <Grid item xs={11}>
        <TextField
          fullWidth
          label="Identifier"
          value={selectedPlace ? selectedPlace.place_id : ""}
        />
      </Grid>
    </>
  );
};
