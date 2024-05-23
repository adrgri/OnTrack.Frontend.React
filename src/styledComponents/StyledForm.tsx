import { styled } from "@mui/material";

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.3rem",
  margin: "auto",
  // height: "100%",
  maxHeight: "100vh",
  maxWidth: "30rem",
  padding: theme.spacing(2),

  "& .MuiTypography-h5": {
    marginBottom: theme.spacing(2),
  },

  "& .MuiButton-root": {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },

  [theme.breakpoints.down("xs")]: {
    padding: theme.spacing(1),
  },
}));

export default StyledForm;
