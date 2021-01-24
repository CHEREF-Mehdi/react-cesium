import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));
