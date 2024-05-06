import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000B70",
    },
    secondary: {
      main: "#EEEFF6",
    },
    background: {
      paper: "#ffffff",
      default: "#F5F5F5",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    htmlFontSize: 14,
    fontWeightRegular: 500,
    fontWeightMedium: 500,
    body1: {
      fontSize: "0.875rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
    button: {
      fontSize: "0.875rem",
    },
    caption: {
      fontSize: "1.7rem",
    },
    overline: {
      fontSize: "0.875rem",
    },
    subtitle1: {
      fontSize: "0.875rem",
    },
    subtitle2: {
      fontSize: "0.75rem",
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: "none",
          padding: "0.7rem 0",
          fontSize: "1rem",
          fontWeight: "400",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          padding: "1rem 0",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "0.5rem 1rem",
          "&:last-child": {
            paddingBottom: "0.5rem",
          },
        },
      },
    },

    // MuiDateCalendar: {
    //   styleOverrides: {
    //     root: {
    //       height: "300px",
    //     },
    //   },
    // },
  },
});
