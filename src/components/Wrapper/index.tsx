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
import { IPlace } from "../../API/api";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface WrapperProps {}

export const Wrapper: React.FC<WrapperProps> = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedPlace, setSelectedPlace] = React.useState<IPlace | undefined>(
    undefined
  );

  React.useEffect(()=>{
    console.log(selectedPlace);
    
  },[selectedPlace])

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Header openDialog={handleClickOpen} />
      <Grid container spacing={3} alignContent="center" justify="center">
        <Grid item xs={10}>
          <Globe />
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
        <DialogContent style={{ overflow: "hidden", height: "30vh" }}>
          <Grid container spacing={4} alignContent="center" justify="center">
            <Form selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace}/>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
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
