import React, { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import Drawer from "@mui/material/Drawer";
import {
  Box,
  Divider,
  FormHelperText,
  NativeSelect,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { themeContext } from "../context/ThemeContext";
import { chatContext } from "../context/ChatContext";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import RotateLeftSharpIcon from "@mui/icons-material/RotateLeftSharp";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Slider from "@mui/material/Slider";

const SideBar = ({
  models,
  currModel,
  setCurrModel,
  temp,
  setTemp,
  maxLength,
  setMaxLength,
}) => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const [state, setState] = useState(false);

  const { theme, toggleTheme } = useContext(themeContext);
  const {
    setIsChatOpen,
    setClearChat,
    initialInputValue,
    setInitialInputValue,
    setLoading,
    setTyping,
    typingInterval,
    loadingInterval,
  } = useContext(chatContext);

  const newChat = () => {
    setClearChat(true);
    setIsChatOpen(false);
    setInitialInputValue("");
    setLoading(false);
    setTyping(false);
    clearInterval(typingInterval.current);
    clearInterval(loadingInterval.current);
  };

  return (
    <Box>
      {isMobile && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            columnGap: "16px",
            color: "text.primary",
            backgroundColor: "background.accent",
            position: "fixed",
            borderBottom: 1,
            borderColor: "text.primary",
            top: 0,
            left: 0,
            p: "8px 16px",
            zIndex: 100,
            width: "100%",
          }}
        >
          <MenuIcon cursor="pointer" onClick={() => setState(!state)} />

          <Box>
            {!initialInputValue
              ? "New chat"
              : initialInputValue.length > 22
              ? initialInputValue.slice(0, 20) + "..."
              : initialInputValue}
          </Box>
          <AddIcon cursor="pointer" onClick={newChat} />
        </Box>
      )}

      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "background.dark",
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))",
            color: "text.primary",
            width: "268px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={state}
        onClose={() => setState(!state)}
      >
        <ScrollBarBox
          sx={{
            "&::-webkit-scrollbar": {
              display: { xs: "none", md: "block" },
              width: "8px",
            },
          }}
        >
          {/* New Chat */}
          <List
            onClick={newChat}
            sx={{
              border: 1,
              borderColor: "background.accent",
              "&:hover": {
                cursor: "pointer",
                backgroundColor: "background.accent",
              },
            }}
          >
            <AddIcon fontSize="small" /> New chat
          </List>

          {/* Chat title */}
          {initialInputValue && (
            <List
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              variant="text"
              backgroundColor="background.accent"
            >
              <ChatBubbleOutlineOutlinedIcon fontSize="small" />
              {initialInputValue.length > 22
                ? initialInputValue.slice(0, 20) + "..."
                : initialInputValue}
            </List>
          )}
          <Divider />

          {/* Native */}
          <FormControl
            sx={{
              width: "207px",
              margin: "0 auto",
            }}
          >
            <InputLabel variant="standard">Model</InputLabel>
            <NativeSelect
              value={currModel}
              onChange={(e) => setCurrModel(e.target.value)}
            >
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.id}
                </option>
              ))}
            </NativeSelect>
            <FormHelperText sx={{ margin: "5px 0 0" }}>
              The model parameter controls the engine used to generate the
              response. <em>text-davinci-003</em> produces best results.
            </FormHelperText>
          </FormControl>

          {/* TEMPERATURE */}
          <Box sx={{ padding: "0 15px" }}>
            <Typography>Temperature</Typography>
            <Slider
              className="temp"
              onChange={(e) => setTemp(e.target.value)}
              sx={{ color: "text.primary" }}
              aria-label="Temperature"
              value={temp}
              valueLabelDisplay="auto"
              step={0.1}
              marks
              min={0}
              max={1}
            />
            <FormHelperText sx={{ margin: 0 }}>
              Higher values means the model will take more risks. Try{" "}
              <em>0.9</em> for more creative responses, and <em>0</em> for ones
              with a well-defined response.{" "}
              <b>
                We generally recommend <em>0</em>
              </b>
            </FormHelperText>
          </Box>

          {/* MAX-LENGTH */}
          <Box sx={{ padding: "0 15px" }}>
            <Typography>Maximum length</Typography>
            <Slider
              onChange={(e) => setMaxLength(e.target.value)}
              sx={{ color: "text.primary" }}
              aria-label="Maximum length"
              value={maxLength}
              valueLabelDisplay="auto"
              min={1}
              max={3000}
            />
            <FormHelperText sx={{ margin: 0 }}>
              The maximum number of tokens to generate. The exact limit varies
              by model.{" "}
              <em>1 token is roughly 4 characters for normal English text</em>
            </FormHelperText>
          </Box>
        </ScrollBarBox>

        <Box
          width="267px"
          padding="10px"
          borderTop={1}
          borderColor="background.primary"
          // backgroundColor="background.dark"
          // position="fixed"
          // bottom={0}
        >
          <List
            onClick={() => {
              setMaxLength(2500);
              setTemp(0);
              setCurrModel("text-davinci-003");
            }}
          >
            <RotateLeftSharpIcon fontSize="small" /> Reset settings to default
          </List>

          <List onClick={() => toggleTheme()}>
            {theme === "light" ? (
              <DarkModeOutlinedIcon fontSize="small" />
            ) : (
              <LightModeOutlinedIcon fontSize="small" />
            )}
            {theme === "light" ? "Dark mode" : "Light mode"}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideBar;

const List = styled(Box)(({ theme }) => ({
  // border: "1px solid blue",
  width: "100%",
  display: "flex",
  columnGap: "15px",
  alignItems: "center",
  padding: "10px 15px",
  borderRadius: "5px",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: theme.palette.background.accent,
  },
}));

const ScrollBarBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  rowGap: "20px",
  padding: "10px",
  overflowY: "scroll",
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.background.dark,
  },
  // "&::-webkit-scrollbar": {

  // },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.background.accent,
    borderRadius: "1rem",
    backgroundClip: "content-box",
  },
  "&::-moz-scrollbartrack-vertical": {
    backgroundColor: theme.palette.background.dark,
  },
  "&::-moz-scrollbar": {
    width: "8px",
  },
  "&::-moz-scrollbarbutton-up": {
    backgroundColor: theme.palette.background.accentBar,
  },
}));
