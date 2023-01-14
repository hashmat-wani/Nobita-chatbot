// export const sizes = {
//   mobile: "480px",
//   tablet: "768px",
//   fablet: "1000px",
//   desktop: "1200px",
// };

// import { createTheme } from "@mui/material";

// const themeCommon = {
//   shadow: "0px 10px 10px rgba(0, 0, 0, 0.2)",
//   shadowSmall: "0px 5px 10px rgba(0, 0, 0, 0.05)",
//   fontFamily: '"Montserrat", sans-serif',
//   secondaryFontFamily: '"Karla", sans-serif',

//   media: {
//     mobile: `(max-width: ${sizes.mobile})`,
//     tablet: `(max-width: ${sizes.tablet})`,
//     fablet: `(max-width: ${sizes.fablet})`,
//     desktop: `(max-width: ${sizes.desktop})`,
//     minMobile: `(min-width: ${sizes.mobile})`,
//     minTablet: `(min-width: ${sizes.tablet})`,
//   },
// };

// export const themelight = {
//   dark: false,
//   bg: "#F8F8F8",
//   accentColor: "#F8F8F8",
//   primaryText: "#383838",
//   ...themeCommon,
// };

// export const themedark = {
//   dark: true,
//   bg: "#343541",
//   accentColor: "#3e3f4b",
//   primaryText: "#dcdcdc",
//   ...themeCommon,
// };

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
