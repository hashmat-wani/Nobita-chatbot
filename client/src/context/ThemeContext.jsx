import React, { createContext } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignTokens } from "../theme";
import useThemes from "../hooks/useThemes";
// import { CssBaseline } from "@mui/material";
export const themeContext = createContext();
const ThemeContext = ({ children }) => {
  const [theme, toggleTheme] = useThemes();
  const currentTheme = createTheme(getDesignTokens(theme));

  return (
    <ThemeProvider theme={currentTheme}>
      {/* <CssBaseline /> */}
      <themeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </themeContext.Provider>
    </ThemeProvider>
  );
};

export default ThemeContext;
