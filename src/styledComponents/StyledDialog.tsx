import { styled } from "@mui/material";
import Dialog from "@mui/material/Dialog";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    paddingInline: "16px",
    paddingTop: 0,
  },
  "& .MuiDialogActions-root": {
    justifyContent: "center",
    paddingInline: "16px",
  },
  "& .MuiDialog-paper": {
    maxWidth: "550px",
    padding: "20px 60px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px 6px",
    },
  },
}));

export default StyledDialog;
