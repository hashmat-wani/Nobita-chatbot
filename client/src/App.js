import "./App.css";
// We're experiencing exceptionally high demand. Please hang tight as we work on scaling our systems.

import SideBar from "./components/SideBar";
import { Box } from "@mui/material";
import Home from "./components/Home";
import ChatContainer from "./components/ChatContainer";
import { useContext, useState } from "react";
import { chatContext } from "./context/ChatContext";

function App() {
  const { isChatOpen } = useContext(chatContext);
  return (
    <div className="App">
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
