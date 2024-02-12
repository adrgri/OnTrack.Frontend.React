import { InputBase, styled } from "@mui/material";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "none",
    fontSize: 14,
    padding: "10px 0",
    width: "300px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderBottom: `2px solid ${theme.palette.primary.main}`,
      outline: "none",
    },
  },
}));

export default StyledInputBase;
