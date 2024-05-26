import React, { useCallback, useEffect, useState } from "react";
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
import ProjectFormModal from "../ProjectFormModal/ProjectFormModal";
import { Project, Member } from "../../types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

interface ProjectCardProps {
  project: Project;
  isEditClicked: boolean;
}

const apiUrl = import.meta.env.VITE_API_URL;

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isEditClicked,
}) => {
  const navigate = useNavigate();
  const { projectProgress } = useProjectStore();
  const progress = project.id ? projectProgress[project.id] || 0 : 0;

  const [isOptionsPopupOpen, setIsOptionsPopupOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);

  const { requestDelete, confirmDelete, isConfirmOpen, closeModal } =
    useDeletion();
  const tasksAmount = project?.taskIds?.length ?? 0;

  const { token } = useAuth();

  useEffect(() => {
    const fetchMembers = async () => {
      if (project?.memberIds?.length) {
        try {
          const response = await axios.get(
            `${apiUrl}/user/by/ids/${project.memberIds.join(",")}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setMembers(response.data);
        } catch (error) {
          console.error("Error fetching project members:", error);
        }
      }
    };

    fetchMembers();
  }, [project, token]);

  const handleOpenOptionsPopup = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget as HTMLButtonElement);
    setIsOptionsPopupOpen(true);
  };

  const handleDelete = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      setIsOptionsPopupOpen(false);

      if (project) {
        requestDelete(
          { id: project.id, type: "project" },
          useProjectStore.getState().deleteProject
        );
      }
    },
    [project, requestDelete]
  );

  const handleEdit = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsOptionsPopupOpen(false);
    setIsFormOpen(true);
  }, []);

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleProjectCardClick = () => {
    navigate(`/projects/${project?.id}/tasks`);
  };

  return (
    <>
      <GenericCard
        onClick={handleProjectCardClick}
        sx={{ width: "400px", position: "relative" }}
      >
        <IconButton
          aria-label="more options"
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={(event) => {
            event.stopPropagation();
            isEditClicked ? handleDelete(event) : handleOpenOptionsPopup(event);
          }}
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
                {members.length > 0 && (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">
                      Zespół
                    </Typography>
                    <MembersAvatarsRow members={members} />{" "}
                  </>
                )}
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Grid item xs={true}>
                {project?.dueDate && <DateChip date={project.dueDate} />}
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
                {`${tasksAmount ?? 0} ${
                  tasksAmount === 1 ? "zadanie" : "zadań"
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
          onEdit={(event) => handleEdit(event)}
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
      <ProjectFormModal
        isOpen={isFormOpen}
        handleClose={handleFormClose}
        project={project}
        mode="edit"
      />
    </>
  );
};

export default ProjectCard;
