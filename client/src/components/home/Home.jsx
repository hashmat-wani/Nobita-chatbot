import React, { useContext, useState } from "react";
import { Box, Stack, styled, Typography, useMediaQuery } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { chatContext } from "../../context/ChatContext";
import botIcon from "../../assets/nobitaBot.ico";
import examples from "./index.json";
import SingleExample from "./SingleExample";

import TagSharpIcon from "@mui/icons-material/TagSharp";

const Home = () => {
  const { setInputValue } = useContext(chatContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (item) => {
    setOpen(true);
    setModelData(item);
  };

  const [modelData, setModelData] = useState(null);

  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(true);
  };

  const isColumn = useMediaQuery("(max-width:970px)");

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      justify-content="center"
      rowGap="50px"
      margin="60px 8% 120px"
    >
      {/* Model */}
      {open && <SingleExample {...modelData} open={open} setOpen={setOpen} />}

      {/* Logo */}
      <Box
        // border={1}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <img height="50px" src={botIcon} alt="" />
        <h1 style={{ fontSize: "50px", margin: 0 }}>Nobita</h1>
      </Box>

      {/* example,limitations */}
      <Stack
        // border={1}
        width="100%"
        direction={{ sm: "column", md: "row" }}
        justifyContent="center"
        alignItems="flex-start"
        spacing={{ xs: 4, md: 2 }}
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
            "Correct this to standard English:\nShe no went to the market.",
            "How do I make an HTTP request in Javascript?",
          ].map((item, idx) => (
            <Item
              hover="true"
              key={idx}
              onClick={() => {
                setInputValue(item);
              }}
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
            <Item key={idx}>{item}</Item>
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
            <Item key={idx}>{item}</Item>
          ))}
        </Stack>
      </Stack>

      {/* More examples */}
      <Box
        // border={1}
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        rowGap="40px"
        marginTop={2}
      >
        <Box textAlign="center">
          <Typography fontWeight="bold" fontSize="25px">
            More examples
          </Typography>
          <Typography>Explore what's possible with some examples</Typography>
        </Box>

        <ShowMorewExamples
          isColumn={isColumn}
          collapseHeight="500px"
          showAll={showAll}
        >
          {examples.examples.map((item, idx) => (
            <Box
              display="flex"
              alignItems="center"
              columnGap="10px"
              key={idx}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  transform: "translate(2px,2px)",
                },
              }}
              onClick={() => handleOpen(item)}
            >
              <Box
                minHeight="54px"
                minWidth="54px"
                backgroundColor={`${item.color}`}
                borderRadius="5px"
                sx={{
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <TagSharpIcon sx={{ color: "#fff" }} />
              </Box>
              <Box>
                <Typography fontSize="16px" fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.tagline}
                </Typography>
              </Box>
            </Box>
          ))}
          {!showAll && (
            <div onClick={handleShowAll} className="showall__button">
              Show all&nbsp;&nbsp;
              <KeyboardArrowDownIcon />
            </div>
          )}
        </ShowMorewExamples>
      </Box>
    </Box>
  );
};

export default Home;

const Item = styled(Box)(({ theme, hover }) => ({
  borderRadius: "6px",
  textAlign: "center",
  fontSize: "14px",
  padding: "10px 15px",
  width: "100%",
  whiteSpace: "pre-wrap",
  backgroundColor: theme.palette.background.accent,

  "&:hover": {
    cursor: `${hover === "true" && "pointer"}`,
    backgroundColor: `${hover === "true" && theme.palette.background.dark}`,
  },
}));

const ShowMorewExamples = styled("div")(
  ({ theme, showAll, collapseHeight, isColumn }) => ({
    width: "100%",
    display: "grid",
    gridTemplateColumns: `${isColumn ? "1fr" : "repeat(2, 1fr)"}`,
    gap: "30px",
    overflow: "hidden",
    position: "relative",
    maxHeight: `${showAll ? "100%" : collapseHeight}`,
    "&::before": {
      content: '""',
      width: "100%",
      height: `${showAll ? 0 : "200px"}`,
      position: "absolute",
      bottom: 0,
      background: `${
        !showAll &&
        `linear-gradient(180deg, rgba(0,0,0,0), 40%,${theme.palette.background.primary})`
      }`,
      transition: "0.3s",
    },

    ".showall__button": {
      cursor: "pointer",
      background: theme.palette.background.dark,
      color: theme.palette.text.primary,
      borderRadius: "5px",
      position: "absolute",
      bottom: "50px",
      left: "50%",
      display: "flex",
      alignItems: "center",
      padding: "10px 13px",
      fontWeight: "bold",
      transform: "translateX(-50%)",
    },
  })
);
