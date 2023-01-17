import React, { useContext, useState } from "react";
import { Box, Stack, styled, Typography, useMediaQuery } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { chatContext } from "../../context/ChatContext";
import botIcon from "../../assets/nobitaBot.ico";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import examples from "./index.json";
// comment
const Tag = ({ tag }) => (
  <Box
    sx={{
      fontSize: "11px",
      backgroundColor: "background.primary",
      padding: "6px",
      borderRadius: "4px",
    }}
  >
    {tag}
  </Box>
);

const Home = () => {
  const { setInputValue } = useContext(chatContext);

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
      // border={1}
      // sx={{
      //   margin: {
      //     xs: "50px 8% 120px",
      //     md: "60px 8% 120px",
      //   },
      // }}
    >
      {/* Logo */}
      <Box
        // border={1}
        sx={{
          // margin: "15px 0 60px",
          display: "flex",
          alignItems: "center",
          columnGap: "10px",
        }}
      >
        <img height="50px" src={botIcon} alt="" />
        <h1 style={{ fontSize: "50px", margin: 0 }}>Nobita</h1>
      </Box>

      {/* Examples */}
      <Box
        // border={1}
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        rowGap="20px"
        marginTop={2}
      >
        <Box display="flex" alignItems="center" columnGap="10px">
          <LightModeOutlinedIcon fontSize="large" />
          <Typography fontWeight="bold" fontSize="25px">
            Examples
          </Typography>
        </Box>

        <ShowAllContainer
          isColumn={isColumn}
          collapseHeight="600px"
          showAll={showAll}
        >
          {examples.examples.map((item, idx) => (
            <Item
              key={idx}
              onClick={() => {
                setInputValue(item.query);
              }}
            >
              <h3 style={{ margin: 0, marginBottom: "10px" }}>{item.title}</h3>
              <Box display="flex" alignItems="center" columnGap="8px">
                {item.tags.map((tag, idx) => (
                  <Tag key={idx} tag={tag} />
                ))}
              </Box>
              <p> {item.query}</p>
            </Item>
          ))}

          {!showAll && (
            <div onClick={handleShowAll} className="showall__button">
              Show all&nbsp;&nbsp;
              <KeyboardArrowDownIcon />
            </div>
          )}
        </ShowAllContainer>
      </Box>

      {/* Limitations */}
      <Box
        // border={1}
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        rowGap="10px"
      >
        <Box display="flex" alignItems="center" columnGap="10px">
          <WarningAmberRoundedIcon />
          <Typography fontSize="20px">Limitations</Typography>
        </Box>
        <Stack
          display="flex"
          direction={{ sm: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={{ xs: 2, md: 2 }}
          flex={1}
          width="100%"
        >
          {[
            "May occasionally generate incorrect information",
            "May occasionally produce harmful instructions or biased content",
            "Limited knowledge of world and events after 2021",
          ].map((item, idx) => (
            <Box
              textAlign="center"
              borderRadius="6px"
              fontSize="13px"
              width="100%"
              padding="10px 15px"
              key={idx}
              backgroundColor="background.accent"
            >
              {item}
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Home;

const Item = styled(Box)(({ theme }) => ({
  borderRadius: "6px",
  fontSize: "13px",
  padding: "10px 15px 0",
  width: "100%",
  whiteSpace: "pre-wrap",
  backgroundColor: theme.palette.background.accent,
  "&:hover": {
    cursor: "pointer",
    backgroundColor: theme.palette.background.dark,
  },
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 4,
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const ShowAllContainer = styled("div")(
  ({ theme, showAll, collapseHeight, isColumn }) => ({
    // border: "1px solid red",
    width: "100%",
    display: "grid",
    gridTemplateColumns: `${isColumn ? "1fr" : "repeat(2, 1fr)"}`,
    gap: "17px",
    overflow: "hidden",
    position: "relative",
    maxHeight: `${showAll ? "100%" : collapseHeight}`,
    "&::before": {
      content: '""',
      width: "100%",
      height: `${showAll ? 0 : "230px"}`,
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
