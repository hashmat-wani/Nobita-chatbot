import React, { useState } from "react";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useRef } from "react";
import generateUniqueId from "../utils/generateUID";
import loader from "../utils/loader";
import typeText from "../utils/typeText";
import chatStripe from "../utils/chatStripe";
import "./chatContainer.css";
import { useContext } from "react";
import { chatContext } from "../context/ChatContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CircularProgress from "@mui/material/CircularProgress";

const ChatContainer = ({loading,setLoading}) => {
  // const [state, setState] = useState(false);
  const formRef = useRef(null);
  const chat_container_ref = useRef(null);
  const loadInterval = useRef(null);
  const {
    setIsChatOpen,
    clearChat,
    setClearChat,
    inputValue,
    setInputValue,
    initialInputValue,
    setInitialInputValue,
  } = useContext(chatContext);

  if (clearChat) {
    chat_container_ref.current.innerHTML = "";
  }
  const controller = new AbortController();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsChatOpen(true);
    setClearChat(false);
    !initialInputValue && setInitialInputValue(inputValue);
    setInputValue("");

    // user chatStripe
    const data = new FormData(formRef.current);
    chat_container_ref.current.innerHTML += chatStripe(
      false,
      data.get("prompt")
    );

    formRef.current.reset();

    // bot's chatStripe
    const uniqueId = generateUniqueId();
    chat_container_ref.current.innerHTML += chatStripe(true, " ", uniqueId);
    chat_container_ref.current.scrollTop =
      chat_container_ref.current.scrollHeight;
    const loadingDiv = document.getElementById(uniqueId);

    loader(loadingDiv, loadInterval);

    fetch("http://localhost:5000", {
      signal: controller.signal,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: data.get("prompt"),
      }),
    }).then(async (response) => {
      clearInterval(loadInterval.current);
      loadingDiv.innerHTML = "";

      if (response.ok) {
        const data = await response.json();

        const parsedData = data.bot.trim();
        typeText(
          loadingDiv,
          chat_container_ref.current,
          parsedData,
          setLoading
        );
      } else {
        const err = await response.text();
        loadingDiv.innerHTML = "Something went worng";
        alert(err);
      }
    });
  };

  return (
    <div>
      {/* <button onClick={() => controller.abort()}>Testing</button> */}
      <div ref={chat_container_ref} id="chat_container"></div>
      <Box
        className="test"
        display="flex"
        flexDirection="column"
        rowGap={2}
        position="fixed"
        bottom={0}
        left="268px"
        padding="15px 30px"
        sx={{
          p: "15px 6%",
          backgroundColor: "background.primary",
          left: { xs: 0, md: "268px" },
          width: { xs: "100%", md: "calc(100% - 268px)" },
          borderColor: "background.accent",
        }}
      >
        <Box backgroundColor="background.accent" borderRadius="8px">
          <form ref={formRef} onSubmit={handleSubmit}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <TextField
                onChange={(e) => setInputValue(e.target.value)}
                name="prompt"
                fullWidth
                value={inputValue}
                variant="standard"
                placeholder="Ask Nobita..."
                multiline
                maxRows={8}
                sx={{ p: "10px 20px" }}
                InputProps={{
                  disableUnderline: true,
                }}
              />
              <Button
                disabled={inputValue.length === 0 || loading}
                sx={{ color: "text.primary" }}
                type="submit"
              >
                {loading ? (
                  <CircularProgress size={20} sx={{ color: "text.primary" }} />
                ) : (
                  <SendIcon />
                )}
              </Button>
            </Box>
          </form>
        </Box>

        <Typography fontSize="12px" textAlign="center">
          Made with <FavoriteIcon fontSize="inherit" /> and{" "}
          <Link href="https://openai.com/" color="inherit">
            Open AI
          </Link>{" "}
          by{" "}
          <Link href="https://hashmat-noorani.github.io/" color="inherit">
            Hashmat Wani
          </Link>
        </Typography>
      </Box>
    </div>
  );
};

export default ChatContainer;
