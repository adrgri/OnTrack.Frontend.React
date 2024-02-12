import { styled, TextField, Theme } from "@mui/material";

// Define the styles for the custom TextField
const smallTextFieldStyle = ({ theme }: { theme: Theme }) => ({
  width: "65px",
  borderRadius: "5px",
  backgroundColor: theme.palette.background.default,
  "& .MuiFilledInput-input": {
    padding: "10px 12px",
    textAlign: "center",
    height: "8px",
  },
  "& .MuiFilledInput-root": {
    backgroundColor: theme.palette.background.default,
    disableUnderline: true,
    borderRadius: "5px",
    "&:after, &:before": {
      display: "none",
    },
    alignSelf: "baseline",
  },
  "& .MuiFilledInput-root:hover": {
    backgroundColor: theme.palette.background.default,
  },
});

// Create the styled TextField component
const StyledSmallTextField = styled(TextField)(smallTextFieldStyle);

export default StyledSmallTextField;
