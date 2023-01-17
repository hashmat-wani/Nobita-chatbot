import React, { useContext } from "react";
import { Box, Stack, styled, Typography } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import { chatContext } from "../context/ChatContext";
import botIcon from "../assets/nobitaBot.ico";

// comment
const Home = () => {
  const { setInputValue } = useContext(chatContext);
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      justify-content="center"
      // border={1}
      sx={{
        margin: {
          xs: "50px 12% 120px",
          md: "30px 12% 120px",
        },
      }}
    >
      <Box
        sx={{
          margin: "15px 0 60px",
          display: "flex",
          alignItems: "center",
          columnGap: "10px",
        }}
      >
        <img height="50px" src={botIcon} alt="" />
        <h1 style={{ fontSize: "50px", margin: 0 }}>Nobita</h1>
      </Box>

      <Stack
        // border={1}
        width="100%"
        direction={{ sm: "column", md: "row" }}
        justifyContent="center"
        alignItems="flex-start"
        spacing={{ xs: 4, md: 2 }}
        mb={5}
      >
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          flex={1}
          width="100%"
        >
          <LightModeOutlinedIcon />
          <Typography>Examples</Typography>
          {[
            "Explain quantam computing in simple terms",
            "Create a keto meal plan for a week for 1500 kcal per day",
            "How do I make an HTTP request in Javascript?",
          ].map((item, idx) => (
            <Item
              key={idx}
              onClick={() => {
                setInputValue(item);
              }}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: "background.dark",
                },
              }}
              backgroundColor="background.accent"
            >
              {item}
            </Item>
          ))}
        </Stack>
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          flex={1}
          width="100%"
        >
          <ElectricBoltOutlinedIcon />
          <Typography>Capabilities</Typography>
          {[
            "Remembers what user said earlier in the conversation",
            "Allows user to provide follow-up corrections",
            "Trained to decline inappropriate requests",
          ].map((item, idx) => (
            <Item key={idx} backgroundColor="background.accent">
              {item}
            </Item>
          ))}
        </Stack>
        <Stack
          display="flex"
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          flex={1}
          width="100%"
        >
          <WarningAmberRoundedIcon />
          <Typography>Limitations</Typography>
          {[
            "May occasionally generate incorrect information",
            "May occasionally produce harmful instructions or biased content",
            "Limited knowledge of world and events after 2021",
          ].map((item, idx) => (
            <Item key={idx} backgroundColor="background.accent">
              {item}
            </Item>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Home;

const Item = styled(Box)({
  borderRadius: "5px",
  padding: "10px 15px",
  textAlign: "center",
  width: "100%",
});
