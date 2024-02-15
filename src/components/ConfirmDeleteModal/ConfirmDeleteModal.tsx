import SmallButton from "../../styledComponents/SmallButton";
import CloseButton from "../CloseButton/CloseButton";
import { Box, Dialog, DialogContent, Typography } from "@mui/material";

const ConfirmDeleteModal = ({ isOpen, onDeleteConfirm, onClose }) => {
  return (
    <Dialog maxWidth="md" open={isOpen} onClose={onClose}>
      <CloseButton onClick={onClose} right={10} top={10} />
      <DialogContent
        sx={{
          padding: "0",
          display: "flex",
          flexDirection: "column",
          width: "450px",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            mt: 7,
            mb: 3,
          }}
        >
          Czy na pewno chcesz usunąć to zadanie?
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            mb: 2,
          }}
        >
          <SmallButton
            variant="contained"
            type="button"
            onClick={onDeleteConfirm}
            sx={{ m: 1 }}
          >
            Usuń
          </SmallButton>
          <SmallButton
            variant="contained"
            onClick={onClose}
            sx={{ m: 1, backgroundColor: "#5E5F7D" }}
          >
            Anuluj
          </SmallButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
