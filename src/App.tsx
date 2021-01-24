import React from "react";
import { Wrapper } from "./components/Wrapper";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 12,
      fontStyle: "italic",
      color:"red",
      fontWeight:"bold"
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Wrapper />
        <ToastContainer autoClose={4000} closeOnClick position="top-left"/>
      </div>
    </ThemeProvider>
  );
};

export default App;
