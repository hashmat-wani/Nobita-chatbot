export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          background: {
            primary: "#F8F8F8",
            accent: "#e6e6e6",
            dark: "#cfcfcf",
          },
          text: {
            primary: "#383838",
          },
        }
      : {
          // palette values for dark mode
          background: {
            dark: "#202123",
            primary: "#343541",
            accent: "#3e3f4b",
            // accent: "#e5c",
          },
          text: {
            primary: "#dcdcdc",
          },
        }),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 768,
      lg: 1200,
      xl: 1536,
    },
  },
});
