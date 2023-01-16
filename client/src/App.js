import "./App.css";
// We're experiencing exceptionally high demand. Please hang tight as we work on scaling our systems.

import SideBar from "./components/SideBar";
import { Alert, Box } from "@mui/material";
import Home from "./components/Home";
import ChatContainer from "./components/ChatContainer";
import { useContext } from "react";
import { chatContext } from "./context/ChatContext";

import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SnackbarContent from "@mui/material/SnackbarContent";

function App() {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSpeechError(false);
  };
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      // color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  // <React.Fragment>
  {
    /* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */
  }
  // <IconButton
  //   size="small"
  //   aria-label="close"
  //   color="inherit"
  //   onClick={handleClose}
  // >
  //   <CloseIcon fontSize="small" />
  // </IconButton>
  // </React.Fragment>
  // );
  const { isChatOpen, speechError, setSpeechError } = useContext(chatContext);
  return (
    <div className="App">
      <Snackbar
        ContentProps={{
          sx: {
            background: "#d32f2f",
            color: "#fff",
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={speechError ? true : false}
        // open={true}
        autoHideDuration={5000}
        onClose={handleClose}
        message={
          <span
            style={{ display: "flex", columnGap: "10px", alignItems: "center" }}
          >
            <ErrorOutlineIcon /> {speechError}
          </span>
        }
        action={action}
      />
      <SideBar />
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        width="100%"
        // border={2}
        backgroundColor="background.primary"
        sx={{ marginLeft: { xs: 0, md: "268px" } }}
      >
        {!isChatOpen && <Home />}
        <ChatContainer />
      </Box>
    </div>
  );
}

export default App;
