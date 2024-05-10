import React, { useCallback, useState } from "react";
import { Typography, Grid, Stack, IconButton } from "@mui/material";
import { useProjectStore } from "../../store/ProjectStore";
import TasksIcon from "../../assets/icons/TasksIcon.svg";
import DateChip from "../CardComponents/DateChip";
import CircularProgressWithLabel from "../CardComponents/CircularProgressWithLabel";
import MembersAvatarsRow from "../CardComponents/MembersAvatarsRow";
import GenericCard from "../GenericCard/GenericCard";
import MenuDotsVertical from "../../assets/icons/MenuDotsVertical.svg";
import CloseIcon from "../../assets/icons/CloseIcon.svg";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import OptionsPopup from "../layout/OptionsPopup";
import useDeletion from "../../hooks/useDeletion";
import ProjectForm from "../ProjectForm/ProjectForm";

interface ProjectCardProps {
  projectId: string;
  handleTaskClick: () => void;
  isEditClicked: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectId,
  handleTaskClick,
  isEditClicked,
}) => {
  const project = useProjectStore((state) =>
    state.projects.find((p) => p.id === projectId)
  );

  const progress = project?.progress ?? 0;
  const [isOptionsPopupOpen, setIsOptionsPopupOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { requestDelete, confirmDelete, isConfirmOpen, closeModal } =
    useDeletion();

  const handleOpenOptionsPopup = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget as HTMLButtonElement);
    setIsOptionsPopupOpen(true);
  };

  const handleDelete = useCallback(() => {
    if (project) {
      requestDelete(
        { id: project.id, type: "project" },
        useProjectStore.getState().deleteProject
      );
    }
  }, [project, requestDelete]);

  const handleEdit = useCallback(() => {
    setIsFormOpen(true);
    setIsOptionsPopupOpen(false);
  }, []);

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      <GenericCard
        onClick={handleTaskClick}
        sx={{ width: "400px", position: "relative" }}
      >
        <IconButton
          aria-label="more options"
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={isEditClicked ? handleDelete : handleOpenOptionsPopup}
        >
          {isEditClicked ? (
            <img src={CloseIcon} alt="Usuń" />
          ) : (
            <img src={MenuDotsVertical} alt="Więcej opcji" />
          )}
        </IconButton>

        <Grid
          container
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent={"space-between"}
        >
          {/* Column 1: Project name, team, and date */}
          <Grid item xs={7}>
            <Grid item xs={12} mb={2} alignItems="center">
              <Typography>{project?.title}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Stack
                spacing={2}
                mb={2}
                sx={{
                  "& > :not(style) ~ :not(style)": {
                    mt: 0,
                  },
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Zespół
                </Typography>
                <MembersAvatarsRow members={project?.members ?? []} />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Grid item xs={true}>
                {project?.endDate && <DateChip date={project.endDate} />}
              </Grid>
            </Grid>
          </Grid>

          {/* Column 2: Progress and task count */}
          <Grid
            item
            alignItems="center"
            justifyContent={"space-between"}
            xs={4}
          >
            <Grid item xs={true} container justifyContent="center">
              <CircularProgressWithLabel value={progress} />
            </Grid>

            <Grid
              item
              xs={12}
              mt={2}
              container
              alignItems="center"
              justifyContent="center"
            >
              <img src={TasksIcon} alt="Tasks" />
              <Typography variant="subtitle2" color="text.secondary" ml={1}>
                {`${project?.tasksAmount ?? 0} ${
                  project?.tasksAmount === 1 ? "zadanie" : "zadań"
                }`}
              </Typography>
            </Grid>
          </Grid>
          <Grid></Grid>
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
          itemName={project?.title}
          itemType="project"
        />
      </GenericCard>
      <ProjectForm
        isOpen={isFormOpen}
        handleClose={handleFormClose}
        // project={project}
        mode="edit"
      />
    </>
  );
};

export default ProjectCard;
