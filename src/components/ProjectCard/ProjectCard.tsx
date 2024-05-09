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

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { requestDelete, confirmDelete, isConfirmOpen, closeModal } =
    useDeletion();

  const handleOpenOptionsPopup = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget as HTMLButtonElement);
  };

  const handleDelete = useCallback(() => {
    if (project) {
      requestDelete(
        { id: project.id, type: "project" },
        useProjectStore.getState().deleteProject
      );
    }
  }, [project, requestDelete]);

  return (
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
        <Grid item direction="column" spacing={2} xs={7}>
          <Grid item xs={12} mb={2} alignItems="center">
            <Typography>{project?.name}</Typography>
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
          direction="column"
          spacing={2}
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
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        onEdit={() => console.log("Edit Project")}
        onDelete={handleDelete}
      />
      <ConfirmDeleteModal
        isOpen={isConfirmOpen}
        onDeleteConfirm={confirmDelete}
        onClose={closeModal}
        itemName={project?.name}
        itemType="project"
      />
    </GenericCard>
  );
};

export default ProjectCard;
