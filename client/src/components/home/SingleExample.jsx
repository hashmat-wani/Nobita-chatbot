import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { Box, DialogActions, Typography, useMediaQuery } from "@mui/material";
import TagSharpIcon from "@mui/icons-material/TagSharp";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SingleExample({
  open,
  setOpen,
  tags,
  title,
  query,
  color,
  tagline,
}) {
  const isMobile = useMediaQuery("(max-width:900px)");
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={isMobile}
        maxWidth="800px"
        sx={{
          ".MuiDialog-container .MuiPaper-root": {
            boxShadow: "none",
            backgroundColor: "background.accent",
          },
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <Box
          maxWidth={`${isMobile ? "100%" : "800px"}`}
          // border={1}
          padding="20px"
          display="flex"
          flexDirection="column"
          rowGap="25px"
        >
          {isMobile && (
            <KeyboardBackspaceIcon
              onClick={handleClose}
              sx={{
                cursor: "pointer",
                // border: "1px solid red",

                // marginLeft: "10px",
                // marginTop: "10px",
              }}
            />
          )}
          {/* Header */}
          <Box
            display="flex"
            alignItems={{ xs: "flex-start", md: "center" }}
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            paddingBottom="20px"
            columnGap="100px"
            rowGap="20px"
            sx={{ borderBottom: 1, borderColor: "text.primary" }}
          >
            {/* Left */}
            <Box display="flex" alignItems="center" columnGap="15px">
              {/* logo */}
              <Box
                minHeight="56px"
                minWidth="56px"
                backgroundColor={color}
                borderRadius="5px"
                sx={{
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <TagSharpIcon />
              </Box>
              {/* headline and tags */}
              <Box pb="3px" border={0}>
                <Typography fontSize="18px" fontWeight="bold">
                  {title}
                </Typography>

                <Box display="flex" alignItems="center" columnGap="8px">
                  {tags.map((tag, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        border: 1,
                        borderColor: "text.primary",
                        fontSize: "14px",
                        padding: "1px 6px",
                        borderRadius: "4px",
                      }}
                    >
                      {tag}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
            {/* Right */}
            <Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#10a37f",
                  color: "#fff",
                  textTransform: "capitalize",
                }}
              >
                Open in playground
              </Button>
            </Box>
          </Box>

          {/* Body */}
          <Box
            fontSize="14px"
            display="flex"
            flexDirection="column"
            rowGap="10px"
            // border={1}
          >
            <Typography>{tagline}</Typography>
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              columnGap="30px"
              rowGap="20px"
              // border={1}
            >
              {/* Input */}
              <Box flex={1}>
                <Typography mb="10px" fontWeight="bold">
                  Input
                </Typography>

                <Typography
                  sx={{
                    backgroundColor: "background.primary",
                    padding: "10px",
                    fontSize: "14px",
                    whiteSpace: "pre-wrap",
                    fontSize: "13px",
                  }}
                >
                  {query}
                </Typography>
              </Box>

              <Box flex={1}>
                <Typography mb="10px" fontWeight="bold">
                  Sample Response
                </Typography>

                <Typography
                  sx={{
                    backgroundColor: "background.primary",
                    padding: "10px",
                    fontSize: "14px",
                    whiteSpace: "pre-wrap",
                    fontSize: "13px",
                  }}
                >
                  {query}
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* <DialogActions></DialogActions> */}
        </Box>
      </Dialog>
    </div>
  );
}
