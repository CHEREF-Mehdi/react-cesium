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
import { toast } from 'react-toastify'; 

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface WrapperProps {}

export const Wrapper: React.FC<WrapperProps> = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedPlace, setSelectedPlace] = React.useState<NS_GEODATA.IPlace | undefined>(undefined);
  const [billboardList, setBillboardList] = React.useState<NS_GEODATA.IPlace[]>([]);
  const [formValidation, setFormValidation] = React.useState<NS_FORM.IFormValidation>({});

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedPlace(undefined);
    setFormValidation({})
  };

  const validate=():boolean=>{
    if (!selectedPlace) {
      setFormValidation({
        message1: "The given name should not be empty",
        message2: "The identifier should not be empty",
      });
      return false;
    }

    if(billboardList.find(bb=>bb.lat===selectedPlace.lat && bb.lon===selectedPlace.lon)){
      setFormValidation({
        message0: "This Place already exists"
      });
      return false;
    }

    if(!selectedPlace.givenName){
      setFormValidation({
        message1: "The given name should not be empty",
      });
      return false;
    }

    if(!selectedPlace.givenId){
      setFormValidation({
        message2: "The identifier should not be empty",
      });
      return false;
    }
    
    //check if givenId is unique
    if(billboardList.find(bb=>selectedPlace.givenId===bb.givenId)){
      setFormValidation({
        message2: "The identifier should unique",
      });
      return false;
    }

    return true;
  }

  const handelClickAdd = () => {
    
    if(!validate()) return ;
    
    setBillboardList([...billboardList,{...selectedPlace!!,creationDate: Date.now()}]);
    handleClose();
    toast("Billboard has been added successfully");
  };
  
  return (
    <>
      <Header openDialog={handleClickOpen} />
      <Grid container spacing={3} alignContent="center" justify="center">
        <Grid item xs={10}>
          <Globe billboardList={billboardList}/>
        </Grid>
      </Grid>

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
