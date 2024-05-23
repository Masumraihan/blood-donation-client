import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f44336",
    },
    secondary: {
      main: "#FF9B80",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          padding: "8px 24px",
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
      },
    },
  },
});
export default theme;
