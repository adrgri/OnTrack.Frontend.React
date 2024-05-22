import { Dialog, DialogContent, Typography, Box } from "@mui/material";
import SmallButton from "../../styledComponents/SmallButton";
import CloseButton from "../CloseButton/CloseButton";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onDeleteConfirm: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  itemName: string | undefined;
  itemType: "task" | "project";
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onDeleteConfirm,
  onClose,
  itemName,
  itemType,
}) => {
  const itemLabel = itemType === "task" ? "to zadanie" : "ten projekt";

  return (
    <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={onClose}>
      <CloseButton onClick={onClose} right={10} top={10} />
      <DialogContent
        sx={{
          padding: "0",
          display: "flex",
          flexDirection: "column",
          width: {
            xs: "90%", // 90% width on extra small screens
            sm: "70%", // 70% width on small screens
            md: "50%", // 50% width on medium screens
            lg: "450px", // Fixed width on large screens
          },
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            mt: { xs: 3, sm: 5, md: 7 }, // Adjust margin top based on screen size
            mb: { xs: 1, sm: 2, md: 3 },
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" }, // Adjust font size based on screen size
          }}
        >
          Czy na pewno chcesz usunąć {itemLabel}{" "}
          {itemName && (
            <span style={{ fontWeight: "bold" }}> "{itemName}"</span>
          )}
          ?
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Stack buttons vertically on small screens
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
            sx={{
              m: 1,
              width: { xs: "60%", sm: "auto" }, // Full width on extra small screens
            }}
          >
            Usuń
          </SmallButton>
          <SmallButton
            variant="contained"
            onClick={onClose}
            sx={{
              m: 1,
              backgroundColor: "#5E5F7D",
              width: { xs: "60%", sm: "auto" }, // Full width on extra small screens
            }}
          >
            Anuluj
          </SmallButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
