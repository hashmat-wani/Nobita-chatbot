import React, { useContext, useState } from "react";
import "../App.css";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import Drawer from "@mui/material/Drawer";
import {
  Box,
  FormHelperText,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { themeContext } from "../context/ThemeContext";
import { chatContext } from "../context/ChatContext";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import RotateLeftSharpIcon from "@mui/icons-material/RotateLeftSharp";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

  // const timer = useRef(null);
  // const debounce = (cb) => {
  //   timer.current && clearTimeout(timer.current);
  //   timer.current = setTimeout(cb, 500);
  // };

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
            color: "text.primary",
            width: "268px",
          },
        }}
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={state}
        onClose={() => setState(!state)}
      >
        <ScrollBarBox>
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

          {/* Models */}
          <FormControl
            sx={{
              width: "237px",
            }}
          >
            <InputLabel id="demo-simple-select-autowidth-label">
              Model
            </InputLabel>
            <Select
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "background.accent",
                },
                "& .MuiSvgIcon-root": {
                  color: "text.primary",
                },
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              value={currModel}
              onChange={(e) => setCurrModel(e.target.value)}
              autoWidth
              label="Model"
            >
              {models.map((model) => (
                <MenuItem key={model.id} value={model.id}>
                  {model.id}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
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
            <FormHelperText>
              Higher values means the model will take more risks. Try{" "}
              <em>0.9</em> for more creative answers, and <em>0</em> for ones
              with a well-defined answer.{" "}
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
            <FormHelperText>
              The maximum number of tokens to generate. The exact limit varies
              by model.{" "}
              <em>1 token is roughly 4 characters for normal English text</em>
            </FormHelperText>
          </Box>
        </ScrollBarBox>

        <Box
          width="268px"
          padding="10px"
          borderTop={1}
          borderColor="background.accent"
          position="fixed"
          bottom={0}
        >
          <List
            onClick={() => {
              setMaxLength(1500);
              setTemp(0);
              setCurrModel("text-davinci-003");
            }}
          >
            <RotateLeftSharpIcon fontSize="small" /> Reset Settings to default
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
  // border: "1px solid red",
  display: "flex",
  flexDirection: "column",
  height: "calc(100vh - 99px)",
  rowGap: "30px",
  padding: "10px",
  overflowY: "scroll",
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.background.dark,
  },
  "&::-webkit-scrollbar": {
    // width: "8px",
    width: { xs: 0, md: "8px" },
  },
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
