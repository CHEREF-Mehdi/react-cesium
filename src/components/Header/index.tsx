import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import {useStyles} from "./style"

export interface HeaderProps {
    openDialog:()=>void
}

export const Header: React.FC<HeaderProps> = ({openDialog}) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Simple React-Cesium application
        </Typography>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={openDialog}
        >
          Add billboard
        </Button>
      </Toolbar>
    </AppBar>
  );
};
