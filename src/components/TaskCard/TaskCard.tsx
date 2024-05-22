import React, { useCallback, useEffect, useState } from "react";
import { Typography, Grid, Box, IconButton } from "@mui/material";
import { useTaskStore } from "../../store/TaskStore";
import DateChip from "../CardComponents/DateChip";
// import MembersAvatarsRow from "../CardComponents/MembersAvatarsRow";
import GenericCard from "../GenericCard/GenericCard";
// import EntityIcon from "../CardComponents/EntityIcon";
import MenuDotsVertical from "../../assets/icons/MenuDotsVertical.svg";
import CloseIcon from "../../assets/icons/CloseIcon.svg";
import OptionsPopup from "../layout/OptionsPopup";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import useDeletion from "../../hooks/useDeletion";
// import { Task } from "../../types";
import { useProjectStore } from "../../store/ProjectStore";
import TaskInfoModal from "../TaskInfoModal/TaskInfoModal";

interface TaskCardProps {
  // task: Task;
  taskId: string | undefined;
  isEditClicked: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ taskId, isEditClicked }) => {
  const task = useTaskStore((state) =>
    state.tasks.find((t) => t.id === taskId)
  );

  useEffect(() => {
    useProjectStore.getState().fetchUserProjects();
  }, []);

  const project = useProjectStore((state) => {
    return state.projects.find((p) => p.id === task?.projectId);
  });

  // console.log("project in TaskCard", project);
  const [isOptionsPopupOpen, setIsOptionsPopupOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isTaskInfoModalOpen, setIsTaskInfoModalOpen] = useState(false);

  const { requestDelete, confirmDelete, isConfirmOpen, closeModal } =
    useDeletion();

  const handleOpenOptionsPopup = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget as HTMLButtonElement);
    setIsOptionsPopupOpen(true);
  };

  const handleEdit = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsOptionsPopupOpen(false);
    setIsTaskInfoModalOpen(true);
  }, []);

  const handleTaskInfoModalClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsTaskInfoModalOpen(false);
    console.log("Task info modal closed");
  };

  const handleDelete = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
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
          {/* <EntityIcon
            icon={task?.icon}
            style={{ width: "15px", height: "15px", marginLeft: "5px" }}
          /> */}
        </Grid>

        <Grid item container xs={12} alignItems="center" spacing={2}>
          <Grid item xs={true}>
            <DateChip date={task?.dueDate ? new Date(task.dueDate) : null} />
          </Grid>
          <Grid item xs={true} container justifyContent="flex-end">
            {/* <MembersAvatarsRow members={task?.members ?? []} /> */}
          </Grid>
        </Grid>
      </Grid>
      <OptionsPopup
        open={isOptionsPopupOpen}
        anchorEl={anchorEl}
        onClose={() => setIsOptionsPopupOpen(false)}
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
