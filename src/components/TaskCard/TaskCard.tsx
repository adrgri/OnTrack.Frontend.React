import React, { useCallback, useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useTaskStore } from "../../store/TaskStore";
import DateChip from "../CardComponents/DateChip";
import MembersAvatarsRow from "../CardComponents/MembersAvatarsRow";
import GenericCard from "../GenericCard/GenericCard";
import MenuDotsVertical from "../../assets/icons/MenuDotsVertical.svg";
import CloseIcon from "../../assets/icons/CloseIcon.svg";
import OptionsPopup from "../layout/OptionsPopup";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import useDeletion from "../../hooks/useDeletion";
import { useProjectStore } from "../../store/ProjectStore";
import TaskInfoModal from "../TaskInfoModal/TaskInfoModal";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Member } from "../../types";

interface TaskCardProps {
  taskId: string | undefined;
  isEditClicked: boolean;
}

const apiUrl = import.meta.env.VITE_API_URL;

const TaskCard: React.FC<TaskCardProps> = ({ taskId, isEditClicked }) => {
  const { token } = useAuth();
  const task = useTaskStore((state) =>
    state.tasks.find((t) => t.id === taskId)
  );

  const project = useProjectStore((state) => {
    return state.projects.find((p) => p.id === task?.projectId);
  });

  const [isOptionsPopupOpen, setIsOptionsPopupOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isTaskInfoModalOpen, setIsTaskInfoModalOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);

  const { requestDelete, confirmDelete, isConfirmOpen, closeModal } =
    useDeletion();

  const fetchMembers = useCallback(
    async (memberIds: string[]) => {
      setIsLoadingMembers(true);
      try {
        const response = await axios.get(
          `${apiUrl}/user/by/ids/${memberIds.join(",")}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching task members:", error);
      } finally {
        setIsLoadingMembers(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (task?.assignedMemberIds?.length) {
      fetchMembers(task.assignedMemberIds);
    }
  }, [task?.assignedMemberIds, fetchMembers]);

  const handleOpenOptionsPopup = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget as HTMLButtonElement);
    setIsOptionsPopupOpen(true);
  };

  const handleCloseOptionsPopup = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
    setIsOptionsPopupOpen(false);
  };

  const handleEdit = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsOptionsPopupOpen(false);
    setIsTaskInfoModalOpen(true);
  }, []);

  const handleTaskInfoModalClose = (event?: React.MouseEvent<HTMLElement>) => {
    event?.stopPropagation();
    setIsTaskInfoModalOpen(false);
  };

  const handleDelete = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      setIsOptionsPopupOpen(false);
      if (task) {
        requestDelete(
          { id: task.id, type: "task" },
          useTaskStore.getState().deleteTask
        );
      }
    },
    [task, requestDelete]
  );

  return (
    <GenericCard
      onClick={(event: React.MouseEvent<HTMLElement>) => handleEdit(event)}
    >
      <Grid container direction="column" spacing={1}>
        <Grid item xs={12} mb={2} container alignItems="center">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              {project && (
                <Typography
                  sx={{ fontSize: "1rem", color: "primary.main", mb: 1.5 }}
                >
                  {project.title}
                </Typography>
              )}
              <Typography variant="body1">{task?.title}</Typography>
            </Box>
            <IconButton
              aria-label="more options"
              onClick={(event) => {
                event.stopPropagation();
                isEditClicked
                  ? handleDelete(event)
                  : handleOpenOptionsPopup(event);
              }}
            >
              {isEditClicked ? (
                <img src={CloseIcon} alt="Usuń" />
              ) : (
                <img src={MenuDotsVertical} alt="Więcej opcji" />
              )}
            </IconButton>
          </Box>
        </Grid>

        <Grid item container xs={12} alignItems="center" spacing={2}>
          <Grid item xs={true}>
            <DateChip date={task?.dueDate ? new Date(task.dueDate) : null} />
          </Grid>
          <Grid item xs={true} container justifyContent="flex-end">
            {isLoadingMembers ? (
              <CircularProgress />
            ) : (
              <MembersAvatarsRow members={members} />
            )}
          </Grid>
        </Grid>
      </Grid>
      <OptionsPopup
        open={isOptionsPopupOpen}
        anchorEl={anchorEl}
        onClose={handleCloseOptionsPopup}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ConfirmDeleteModal
        isOpen={isConfirmOpen}
        onDeleteConfirm={confirmDelete}
        onClose={closeModal}
        itemName={task?.title}
        itemType="task"
      />
      <TaskInfoModal
        isOpen={isTaskInfoModalOpen}
        onClose={handleTaskInfoModalClose}
        taskId={taskId ?? null}
        mode="edit"
      />
    </GenericCard>
  );
};

export default TaskCard;
