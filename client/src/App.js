import "./App.css";

import SideBar from "./components/SideBar";
import { Box } from "@mui/material";
import Home from "./components/Home";
import ChatContainer from "./components/ChatContainer";
import { useContext, useState } from "react";
import { chatContext } from "./context/ChatContext";

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [models, setModels] = useState([]);
  const [currModel, setCurrModel] = useState("text-davinci-003");
  const [temp, setTemp] = useState(0);
  const [maxLength, setMaxLength] = useState(1500);

  useEffect(() => {
    axios
      .get("https://nobita-chatbot.onrender.com/models")
      .then((data) => {
        console.log(data.data.models.data);
        setModels(data.data.models.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(models);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSpeechError(false);
  };
  const action = (
    <IconButton
      sx={{ color: "#fff" }}
      size="small"
      aria-label="close"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  const { isChatOpen, speechError, setSpeechError } = useContext(chatContext);
  return (
    <div className="App">
      <Snackbar
        ContentProps={{
          sx: {
            background: "#d32f2f",
            color: "#fff !important",
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={speechError ? true : false}
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
      <SideBar
        models={models}
        currModel={currModel}
        setCurrModel={setCurrModel}
        temp={temp}
        setTemp={setTemp}
        maxLength={maxLength}
        setMaxLength={setMaxLength}
      />
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        width="100%"
        // border={2}
        color="text.primary"
        backgroundColor="background.primary"
        sx={{ marginLeft: { xs: 0, md: "268px" } }}
      >
        {!isChatOpen && <Home />}
        <ChatContainer
          currModel={currModel}
          temp={temp}
          maxLength={maxLength}
        />
      </Box>
    </div>
  );
}

export default App;
