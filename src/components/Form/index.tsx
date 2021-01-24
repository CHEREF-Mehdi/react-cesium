import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Select from "react-select";
import { usePlacesQuery } from '../../hooks';
import { ErrorTypography } from '../../components/ErrorTypography';

export interface FormProps {
  selectedPlace: NS_GEODATA.IPlace | undefined;
  setSelectedPlace: React.Dispatch<
    React.SetStateAction<NS_GEODATA.IPlace | undefined>
  >;
  formValidation: NS_FORM.IFormValidation;
}

export const Form: React.FC<FormProps> = ({
  selectedPlace,
  setSelectedPlace,
  formValidation,
}) => {
  //state to manage input live search data
  const [filter, setFilter] = React.useState<string>("");
  //consts to manage the props of the select component 
  const { loading, places } = usePlacesQuery(filter);

  return (
    <>
      <Grid item xs={11}>
        <Select
          placeholder={"Search location..."}
          options={places.map((place) => ({
            value: place.place_id,
            label: place.display_name,
          }))}
          value={
            selectedPlace
              ? {
                  value: selectedPlace.place_id,
                  label: selectedPlace.display_name,
                }
              : null
          }
          isLoading={loading}
          isClearable
          backspaceRemovesValue
          onInputChange={(newValue) => setFilter(newValue.trim())}
          maxMenuHeight={150}
          onChange={(e) => {
            const selectedP = places.find((p) => p.place_id === e?.value);
            selectedP
              ? setSelectedPlace({
                  ...selectedP,
                  givenName: filter,
                  givenId: selectedP.place_id.toString(),
                  creationDate: Date.now(),
                })
              : setSelectedPlace(selectedP);
          }}
        />
        <ErrorTypography
         error={formValidation.message0} 
        />
      </Grid>

      {/* name place field */}
      <Grid item xs={11}>
        <TextField
          fullWidth
          label="Given name"
          value={selectedPlace ? selectedPlace.givenName : ""}
          disabled
        />
        <ErrorTypography
         error={formValidation.message1} 
        />
      </Grid>

      {/* id place field */}
      <Grid item xs={11}>
        <TextField
          fullWidth
          label="Identifier"
          value={selectedPlace ? selectedPlace.givenId : ""}
          onChange={(e) => {
            if (selectedPlace)
              setSelectedPlace({
                ...selectedPlace,
                givenId: e.currentTarget.value.trim(),
              });
          }}
        />
        <ErrorTypography
         error={formValidation.message2} 
        />
      </Grid>
    </>
  );
};
