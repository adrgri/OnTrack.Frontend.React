import SmallButton from "../../styledComponents/SmallButton";
import CloseButton from "../CloseButton/CloseButton";
import { Dialog, Typography } from "@mui/material";

const ConfirmDeleteModal = ({ isOpen, onDeleteConfirm, onClose }) => {
  return (
    <Dialog fullWidth maxWidth="md" open={isOpen} onClose={onClose}>
      <CloseButton onClick={onClose} right={20} top={20} />
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "24px",
          lineHeight: "28px",
          textAlign: "center",
          color: "#000000",
        }}
      >
        Czy na pewno chcesz usunąć to zadanie?
      </Typography>
      <SmallButton
        variant="contained"
        type="button"
        onClick={onDeleteConfirm}
        sx={{ m: 1 }}
      >
        Usuń
      </SmallButton>
      <SmallButton variant="contained" onClick={onClose} sx={{ m: 1 }}>
        Anuluj
      </SmallButton>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
