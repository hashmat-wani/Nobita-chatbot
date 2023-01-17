import SideBar from "./components/SideBar";
import { Box, styled } from "@mui/material";
import Home from "./components/Home";
import { useContext, useState } from "react";
import { chatContext } from "./context/ChatContext";

import { useEffect } from "react";
import axios from "axios";
import ChatContainer from "./components/chatContainer/ChatContainer";
import SnackBar from "./components/SnackBar";

function App() {
  const [models, setModels] = useState([]);
  const [currModel, setCurrModel] = useState("text-davinci-003");
  const [temp, setTemp] = useState(0);
  const [maxLength, setMaxLength] = useState(2500);

  useEffect(() => {
    axios
      .get("https://nobita-chatbot.onrender.com/models")
      .then((data) => {
        setModels(data.data.models.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const { isChatOpen } = useContext(chatContext);
  return (
    <AppWrapper>
      <SnackBar />
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
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled("div")({
  display: "flex",
  fontSize: "14px",
});
