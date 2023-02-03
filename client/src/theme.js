export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          background: {
            dark: "#f9f9f9",
            primary: "#e9e9e9",
            accent: "#d9d9d9",
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
