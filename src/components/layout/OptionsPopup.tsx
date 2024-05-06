import {
  Popover,
  List,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import CloseIcon from "../../assets/icons/OptionsIcons/CloseIcon.svg";
import EditIcon from "../../assets/icons/OptionsIcons/EditIcon.svg";

interface PopupLayoutProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  children?: React.ReactNode;
}

const OptionsPopup: React.FC<PopupLayoutProps> = ({
  open,
  anchorEl,
  onClose,
}) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "5px", // Apply border radius to Paper component
            width: 150,
            bgcolor: "background.paper",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          },
        },
      }}
    >
      <List>
        <ListItemButton>
          <img src={EditIcon} alt="Edytuj" style={{ marginRight: "10px" }} />

          <ListItemText primary="Edytuj" sx={{ color: "#5F5B5B" }} />
        </ListItemButton>

        <Divider />

        <ListItemButton>
          <img src={CloseIcon} alt="Edytuj" style={{ marginRight: "10px" }} />

          <ListItemText primary="Usuń" sx={{ color: "#5F5B5B" }} />
        </ListItemButton>
      </List>
    </Popover>
  );
};

export default OptionsPopup;
