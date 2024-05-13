import {
  Popover,
  List,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import CloseIcon from "../../assets/icons/OptionsIcons/CloseIcon.svg";
import EditIcon from "../../assets/icons/OptionsIcons/EditIcon.svg";

interface OptionsPopupProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  onEdit: (event: React.MouseEvent<HTMLElement>) => void;
  onDelete: (event: React.MouseEvent<HTMLElement>) => void;
}

const OptionsPopup: React.FC<OptionsPopupProps> = ({
  open,
  anchorEl,
  onClose,
  onEdit,
  onDelete,
}) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{
        sx: {
          borderRadius: "5px",
          width: 150,
          bgcolor: "background.paper",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      <List>
        <ListItemButton onClick={onEdit}>
          <img src={EditIcon} alt="Edit" style={{ marginRight: "10px" }} />
          <ListItemText primary="Edytuj" />
        </ListItemButton>
        <Divider />
        <ListItemButton onClick={(event) => onDelete(event)}>
          <img src={CloseIcon} alt="Delete" style={{ marginRight: "10px" }} />
          <ListItemText primary="Usuń" />
        </ListItemButton>
      </List>
    </Popover>
  );
};

export default OptionsPopup;
