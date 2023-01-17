import React, { useState } from "react";
import {
  Box,
  Button,
  Link,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useRef } from "react";
import generateUniqueId from "../utils/generateUID";
import loader from "../utils/loader";
import chatStripe from "../utils/chatStripe";
import "./chatContainer.css";
import { useContext } from "react";
import { chatContext } from "../context/ChatContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CircularProgress from "@mui/material/CircularProgress";
import CachedIcon from "@mui/icons-material/Cached";
import StopOutlinedIcon from "@mui/icons-material/StopOutlined";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import typeText from "../utils/typeText";
import { themeContext } from "../context/ThemeContext";
import useSpeech from "../hooks/useSpeech";
import SpeechLoading from "./speechLoading/SpeechLoading";
import speak from "../hooks/speak";

const ChatContainer = ({ currModel, temp, maxLength }) => {
  const formRef = useRef(null);
  const chat_container_ref = useRef(null);
  const [lastInputValue, setLastInputValue] = useState("");
  const [lastUniqueId, setLastUniqueId] = useState("");
  const [error, setError] = useState(false);
  const startSpeak = useSpeech(handleSubmit);

  const {
    setIsChatOpen,
    clearChat,
    setClearChat,
    inputValue,
    setInputValue,
    initialInputValue,
    setInitialInputValue,
    loading,
    setLoading,
    loadingInterval,
    typing,
    setTyping,
    typingInterval,
    speechLoading,
  } = useContext(chatContext);

  const { theme } = useContext(themeContext);

  if (clearChat) {
    chat_container_ref.current.innerHTML = "";
  }

  function checkGreeting(value) {
    return [
      "hi",
      "hello",
      "hey",
      "hey nobita",
      "how are you",
      "greeting",
      "how do you do",
    ].includes(value.toLowerCase());
  }

  async function handleSubmit(e, lastInput = false, speechRes = false) {
    e && e.preventDefault();
    const data = new FormData(formRef.current);
    let query = lastInput
      ? lastInput
      : speechRes
      ? speechRes
      : data.get("prompt");
    query = query.trim();
    let payload = { query, model: currModel, temp, maxLength };
    if (!query) return;
    setLoading(true);
    setIsChatOpen(true);
    setClearChat(false);

    if (!initialInputValue || checkGreeting(initialInputValue)) {
      if (checkGreeting(query)) setInitialInputValue("Greeting");
      else setInitialInputValue(query);
    }
    setLastInputValue(query);
    setInputValue("");

    // user chatStripe

    if (!lastInput) {
      chat_container_ref.current.innerHTML += chatStripe(false, query);
    }

    formRef.current.reset();

    // bot's chatStripe
    let uniqueId;
    if (!lastInput) {
      uniqueId = generateUniqueId();
      setLastUniqueId(uniqueId);
    }
    if (!lastInput) {
      chat_container_ref.current.innerHTML += chatStripe(true, " ", uniqueId);
    }

    chat_container_ref.current.scrollTop =
      chat_container_ref.current.scrollHeight;
    const loadingDiv = document.getElementById(
      lastInput ? lastUniqueId : uniqueId
    );

    if (lastInput)
      loadingDiv.style.color = theme === "light" ? "#383838" : "#dcdcdc";
    loader(loadingDiv, loadingInterval);

    fetch("https://nobita-chatbot.onrender.com/models", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: payload,
      }),
    })
      .then(async (response) => {
        clearInterval(loadingInterval.current);
        loadingDiv.innerHTML = "";

        if (response.ok) {
          setError(false);
          const data = await response.json();
          const parsedData = data.bot.trim();
          const responses = document.querySelectorAll(".ai");
          document.querySelectorAll(".copy").forEach((el, idx) => {
            el.addEventListener("click", () => {
              navigator.clipboard.writeText(responses[idx].innerText);
            });
          });

          document.querySelectorAll(".play").forEach((el, idx) => {
            el.addEventListener("click", () => speak(responses[idx].innerText));
          });

          if (parsedData === "") {
            loadingDiv.innerHTML =
              "No results Found 😞\n<small>Change model</small>";
            setLoading(false);
          } else {
            setTyping(true);
            typeText(
              loadingDiv,
              chat_container_ref.current,
              parsedData,
              typingInterval,
              setLoading,
              setTyping
            );
          }
        } else {
          setError(true);
          setLoading(false);
          // const err = await response.text();
          loadingDiv.innerHTML =
            "An error occurred. Either the engine you requested does not exist or there was another issue processing your request.\n<small>Hint: Try to change <b>Engine/Model</b> or check your internet connection and then <b>Regenerate response</b><small>";
          loadingDiv.style.color = "#EF4444";
        }
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        loadingDiv.innerHTML =
          "Sorry, server is down rightnow, try again later";
        loadingDiv.style.color = "#EF4444";
        clearInterval(loadingInterval.current);
      });
  }

  return (
    <div>
      <Container
        typing={typing}
        load={loading}
        error={error}
        ref={chat_container_ref}
        id="chat_container"
      ></Container>

      {/* Footer */}
      <Box
        display="flex"
        flexDirection="column"
        rowGap={1}
        position="fixed"
        bottom={0}
        sx={{
          left: { xs: 0, md: "268px" },
          width: { xs: "100%", md: "calc(100% - 268px)" },
          borderColor: "background.accent",
        }}
      >
        {initialInputValue && (
          <Box
            margin="0 auto"
            sx={{
              cursor: "pointer",
              backgroundColor: "background.primary",
            }}
          >
            {typing ? (
              <FloatingBtn
                onClick={() => {
                  clearInterval(typingInterval.current);
                  setTyping(false);
                  setLoading(false);
                }}
              >
                <StopOutlinedIcon fontSize="small" />
                Stop generating
              </FloatingBtn>
            ) : !loading ? (
              <FloatingBtn onClick={(e) => handleSubmit(e, lastInputValue)}>
                <CachedIcon fontSize="small" />
                Regenerate response
              </FloatingBtn>
            ) : null}
          </Box>
        )}
        <Box
          className="footer"
          display="flex"
          flexDirection="column"
          rowGap={2}
          // border={1}
          sx={{
            p: { xs: "10px 6% 15px", md: "7px 6% 12px" },
            backgroundColor: "background.primary",
            borderColor: "background.accent",
          }}
        >
          <Box backgroundColor="background.accent" borderRadius="8px">
            <form ref={formRef} onSubmit={handleSubmit}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p="0 10px 0 20px"
              >
                <TextField
                  // border={1}
                  onChange={(e) => setInputValue(e.target.value)}
                  name="prompt"
                  fullWidth
                  value={inputValue}
                  variant="standard"
                  placeholder="Ask Nobita..."
                  multiline
                  maxRows={4}
                  sx={{
                    p: "10px 0",
                    overflow: "hidden",
                    // border: "1px solid red",
                  }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
                <Button
                  disabled={loading}
                  sx={{
                    color: "text.primary",
                    borderRadius: "5px",
                    "&:hover": {
                      backgroundColor: "background.primary",
                    },
                  }}
                >
                  {speechLoading ? (
                    <SpeechLoading />
                  ) : (
                    <KeyboardVoiceOutlinedIcon
                      cursor="pointer"
                      onClick={startSpeak}
                    />
                  )}
                </Button>
                <Button
                  disabled={inputValue.trim().length === 0 || loading}
                  sx={{
                    color: "text.primary",
                    borderRadius: "5px",
                    "&:hover": {
                      backgroundColor: "background.primary",
                    },
                  }}
                  type="submit"
                >
                  {loading ? (
                    <CircularProgress
                      size={20}
                      sx={{ color: "text.primary" }}
                    />
                  ) : (
                    <SendIcon />
                  )}
                </Button>
              </Box>
            </form>
          </Box>

          <Typography fontSize="12px" textAlign="center">
            Made with <FavoriteIcon fontSize="inherit" /> and{" "}
            <Link target="_blank" href="https://openai.com/" color="inherit">
              Open AI
            </Link>{" "}
            by{" "}
            <Link
              target="_blank"
              href="https://hashmat-noorani.github.io/"
              color="inherit"
            >
              Hashmat Wani
            </Link>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default ChatContainer;

const Container = styled("div")(({ theme, typing, load, error }) => ({
  // color: theme.palette.text.primary,
  ".ai": { backgroundColor: theme.palette.background.accent },
  ".copy-play": {
    display: `${typing || load || error ? "none" : "flex"}`,
    alignItems: "center",
    columnGap: "16px",
    "& img": { width: "15px", cursor: "pointer" },
  },
}));

const FloatingBtn = styled(Box)(({ theme }) => ({
  padding: "8px 12px",
  border: `1px solid ${theme.palette.background.dark}`,
  ":hover": { backgroundColor: theme.palette.background.accent },
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  columnGap: "5px",
  borderRadius: "5px",
}));
