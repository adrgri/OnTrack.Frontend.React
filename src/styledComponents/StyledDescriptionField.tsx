import { TextField, styled } from "@mui/material";

const StyledDescriptionField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    border: "none",
    // "&:hover .MuiInputBase-input": {
    //   backgroundColor: "#EEEFF6",
    // },
  },
  "& .MuiInputBase-input": {
    borderRadius: "4px",
    backgroundColor: theme.palette.secondary.main,
    borderColor: "transparent",
    boxShadow: "none",
    padding: "10px",
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export default StyledDescriptionField;
