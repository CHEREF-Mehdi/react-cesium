import * as React from "react";
import { Globe } from "../Globe";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { TransitionProps } from "@material-ui/core/transitions";
import { Header } from "../Header";
import { Form } from "../Form";
import { toast } from "react-toastify";

//create transition to the dialog box form
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface WrapperProps {}

//component wrapping the home page
export const Wrapper: React.FC<WrapperProps> = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  //state to manage the picked place from the search list
  const [selectedPlace, setSelectedPlace] = React.useState<
    NS_GEODATA.IPlace | undefined
  >(undefined);
  //state to manage the list of the selected place to pin as billboard entity
  const [billboardList, setBillboardList] = React.useState<NS_GEODATA.IPlace[]>(
    []
  );
  //state to manage the form validation error messages
  const [
    formValidation,
    setFormValidation,
  ] = React.useState<NS_FORM.IFormValidation>({});

  //open dialog function
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  //close dialog function
  const handleClose = () => {
    setOpenDialog(false);
    setSelectedPlace(undefined);
    setFormValidation({});
  };

  //function to validate billboard addition form
  const validate = (
    place: NS_GEODATA.IPlace | undefined,
    placeList: NS_GEODATA.IPlace[]
  ): boolean => {
    //check if the user did select a place
    if (!place) {
      setFormValidation({
        message1: "The given name should not be empty",
        message2: "The identifier should not be empty",
      });
      return false;
    }

    //check if the place is already billboarded
    if (placeList.find((bb) => bb.lat === place.lat && bb.lon === place.lon)) {
      setFormValidation({
        message0: "This Place already exists",
      });
      return false;
    }

    //check if the place name is given
    if (!place.givenName) {
      setFormValidation({
        message1: "The given name should not be empty",
      });
      return false;
    }
    //check if the place id is given
    if (!place.givenId) {
      setFormValidation({
        message2: "The identifier should not be empty",
      });
      return false;
    }

    //check if given id is unique
    if (placeList.find((bb) => place.givenId === bb.givenId)) {
      setFormValidation({
        message2: "The identifier should be unique",
      });
      return false;
    }

    return true;
  };

  const handelClickAdd = () => {
    //check if the validation passed
    if (!validate(selectedPlace, billboardList)) return;

    //add the selected place to billboard list
    setBillboardList([
      ...billboardList,
      { ...selectedPlace!!, creationDate: Date.now() },
    ]);

    //close the dialog box
    handleClose();

    //notify the user
    toast.success("Billboard has been added successfully");
  };

  React.useEffect(()=>{
    if(selectedPlace) setFormValidation({});
  },[selectedPlace])

  return (
    <>
      {/* the header of the app */}
      <Header openDialog={handleClickOpen} />

      {/* main view */}
      <Grid container spacing={3} alignContent="center" justify="center">
        <Grid item xs={10}>
          {/* Globe component rendring the cesium Viewer component*/}
          <Globe billboardList={billboardList} />
        </Grid>
      </Grid>

      {/* dialog box */}
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth={"sm"}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Add billboard form
        </DialogTitle>

        <DialogContent style={{ overflow: "hidden", height: "40vh" }}>
          <Grid container spacing={4} alignContent="center" justify="center">
            {/* form component to add billboard */}
            <Form
              selectedPlace={selectedPlace}
              setSelectedPlace={setSelectedPlace}
              formValidation={formValidation}
            />
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handelClickAdd} color="primary">
            Add
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>

      </Dialog>
    </>
  );
};
