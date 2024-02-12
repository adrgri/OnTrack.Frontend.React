import { styled, TextField, Theme, TextFieldProps } from "@mui/material";

const baseInputStyle = ({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1),
  marginTop: theme.spacing(2),
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "& .MuiFilledInput-input": {
    padding: "0",
    "&::placeholder": {
      color: "#5F5B5B",
      opacity: 1,
    },
  },
  "& .MuiFilledInput-root": {
    "&:before": {
      display: "none",
    },
    "&:after": {
      display: "none",
    },
    backgroundColor: theme.palette.background.default,
  },
  "& .MuiFilledInput-root:hover": {
    backgroundColor: theme.palette.background.default,
  },
});

type StyledSidebarModalInputProps = TextFieldProps & {
  endAdornment?: React.ReactNode;
};

// Create the styled TextField component
const StyledSidebarModalInput = styled(
  (props: StyledSidebarModalInputProps) => (
    <TextField
      {...props}
      InputProps={{
        ...props.InputProps,
        endAdornment: props.endAdornment,
      }}
    />
  )
)(baseInputStyle);
export default StyledSidebarModalInput;
