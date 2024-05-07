import {
  Popover,
  List,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import CloseIcon from "../../assets/icons/OptionsIcons/CloseIcon.svg";
import EditIcon from "../../assets/icons/OptionsIcons/EditIcon.svg";
import { useTaskStore } from "../../store/TaskStore";
import { useState } from "react";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import { Task } from "../../types";

interface PopupLayoutProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  children?: React.ReactNode;
  task: Task | undefined;
}

const OptionsPopup: React.FC<PopupLayoutProps> = ({
  open,
  anchorEl,
  onClose,
  task,
}) => {
  const { deleteTask } = useTaskStore();
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  const handleDelete = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    setIsConfirmDeleteModalOpen(true);
    console.log("Delete action triggered");
  };

  const handleDeleteConfirm = () => {
    if (task?.id) {
      deleteTask(task.id)
        .then(() => {
          console.log("Task deleted successfully");
          setIsConfirmDeleteModalOpen(false);
          onClose();
        })
        .catch((error) => {
          console.error("Failed to delete task:", error);
        });
    }
  };

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
            borderRadius: "5px",
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

        <ListItemButton onClick={handleDelete}>
          <img src={CloseIcon} alt="Edytuj" style={{ marginRight: "10px" }} />

          <ListItemText primary="Usuń" sx={{ color: "#5F5B5B" }} />
        </ListItemButton>
      </List>
      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onDeleteConfirm={handleDeleteConfirm}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        task={task}
      />
    </Popover>
  );
};

export default OptionsPopup;
