import { useEffect, useState } from "react";
import BoardNavigation from "../BoardNavigation/BoardNavigation";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useProjectStore } from "../../store/ProjectStore";
import ProjectInfoModal from "../ProjectInfoModal/ProjectInfoModal";
import ActionButtons from "../UI/ActionButtons";
import AddProjectForm from "../AddProjectForm/AddProjectForm";

export default function ProjectsBoard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isProjectInfoModalOpen, setIsProjectInfoModalOpen] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState<string | null>(null);
  const [isAddProjectFormModalOpen, setIsAddProjectFormModalOpen] =
    useState(false);

  const { projects, fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleEdit = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    // setIsEditClicked((prevIsEditClicked) => !prevIsEditClicked);
    console.log("Edit action triggered");
  };

  function handleProjectInfoModalClose() {
    setIsProjectInfoModalOpen(false);
  }

  function handleAddProjectFormClose() {
    setIsAddProjectFormModalOpen(false);
  }

  const handleAddProject = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setIsAddProjectFormModalOpen(true);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="baseline"
        justifyContent="space-between"
      >
        <Grid item>
          <BoardNavigation
            leftButtonLabel="Projekty"
            rightButtonLabel="Tablica"
            leftButtonLink="/projects"
            rightButtonLink="/tablica"
          />
        </Grid>

        <ActionButtons handleAdd={handleAddProject} handleEdit={handleEdit}>
          Projekt
        </ActionButtons>
      </Grid>

      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{
          flexDirection: isMobile ? "column" : "row",
          [theme.breakpoints.up("md")]: {
            alignItems: "flex-start",
          },
          [theme.breakpoints.down("md")]: {
            alignItems: "center",
          },
        }}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            projectId={project.id}
            handleTaskClick={() => {}}
          />
        ))}
      </Grid>

      <ProjectInfoModal isOpen={isProjectInfoModalOpen} />
      <AddProjectForm
        isOpen={isAddProjectFormModalOpen}
        handleClose={handleAddProjectFormClose}
        title="Dodaj projekt"
      />
    </>
  );
}
