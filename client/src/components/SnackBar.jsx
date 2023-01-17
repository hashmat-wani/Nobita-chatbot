import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Snackbar } from "@mui/material";
import { chatContext } from "../context/ChatContext";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";

const SnackBar = () => {
  const {
    speechError,
    snackBarOpenStatus,
    setSnackBarOpenStatus,
    snackBarVariant,
  } = useContext(chatContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpenStatus(false);
  };
  const action = (
    <IconButton
      sx={{ color: `${snackBarVariant === "error" ? "#fff" : "text.primary"}` }}
      size="small"
      aria-label="close"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  return (
    <Snackbar
      ContentProps={{
        sx: {
          backgroundColor: `${
            snackBarVariant === "error" ? "#d32f2f" : "background.accent"
          }`,
          color: `${snackBarVariant === "error" ? "#fff" : "text.primary"}`,
        },
      }}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={snackBarOpenStatus}
      autoHideDuration={snackBarVariant === "error" ? 5000 : 1500}
      onClose={handleClose}
      message={
        <span
          style={{ display: "flex", columnGap: "10px", alignItems: "center" }}
        >
          {snackBarVariant === "error" ? (
            <ErrorOutlineIcon />
          ) : (
            <TaskOutlinedIcon />
          )}
          {snackBarVariant === "error" ? `${speechError}` : "Copied"}
        </span>
      }
      action={action}
    />
  );
};

export default SnackBar;
