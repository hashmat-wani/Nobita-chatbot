import React, { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import Drawer from "@mui/material/Drawer";
import { Box, styled, useMediaQuery } from "@mui/material";
import { themeContext } from "../context/ThemeContext";
import { chatContext } from "../context/ChatContext";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

const SideBar = ({ setLoading }) => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const [state, setState] = React.useState(false);
  const { theme, toggleTheme } = useContext(themeContext);
  const {
    setIsChatOpen,
    setClearChat,
    initialInputValue,
    setInitialInputValue,
  } = useContext(chatContext);

  return (
    <Box fontSize="14px">
      {isMobile && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            columnGap: "16px",
            color: "text.primary",
            backgroundColor: "background.accent",
            position: "absolute",
            borderBottom: 1,
            borderColor: "text.primary",
            top: 0,
            left: 0,
            p: "8px 16px",
            zIndex: 100,
            width: "100%",
          }}
        >
          <MenuIcon onClick={() => setState(!state)} />

          <Box>
            {!initialInputValue
              ? "New chat"
              : initialInputValue.length > 22
              ? initialInputValue.slice(0, 20) + "..."
              : initialInputValue}
          </Box>
          <AddIcon
            onClick={() => {
              setClearChat(true);
              setIsChatOpen(false);
              setInitialInputValue("");
              setLoading(false);
            }}
          />
        </Box>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={state}
        onClose={() => setState(!state)}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p={1}
          sx={{
            height: "100%",
            backgroundColor: "background.dark",
          }}
        >
          <Box display="flex" flexDirection="column" rowGap={2}>
            <List
              onClick={() => {
                setClearChat(true);
                setIsChatOpen(false);
                setInitialInputValue("");
                setLoading(false);
              }}
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
            {initialInputValue && (
              <List
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                variant="text"
                backgroundColor="background.accent"
                onClick={() => toggleTheme()}
              >
                <ChatBubbleOutlineOutlinedIcon fontSize="small" />
                {initialInputValue.length > 22
                  ? initialInputValue.slice(0, 20) + "..."
                  : initialInputValue}
              </List>
            )}
          </Box>

          <List
            sx={{
              "&:hover": {
                cursor: "pointer",
                backgroundColor: "background.accent",
              },
            }}
            variant="text"
            onClick={() => toggleTheme()}
          >
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

const List = styled(Box)({
  width: "250px",
  color: "text.primary",
  display: "flex",
  columnGap: "15px",
  alignItems: "center",
  padding: "10px",
  borderRadius: "5px",
});
