import React, { useContext } from "react";
import { Box, Stack, styled, Typography } from "@mui/material";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import { chatContext } from "../context/ChatContext";

const Home = () => {
  const { setInputValue } = useContext(chatContext);
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      justify-content="center"
      // border={1}
      margin="30px 12% 120px"
    >
      <h1 style={{ margin: "20px 0 60px" }}>Nobita</h1>

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
            "Got any creative ideas for a 10 year old’s birthday?",
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
  fontSize: "14px",
  borderRadius: "5px",
  padding: "10px 15px",
  textAlign: "center",
  width: "100%",
});
