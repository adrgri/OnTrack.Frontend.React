import { useEffect, useState } from "react";
import BoardNavigation from "../BoardNavigation/BoardNavigation";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useProjectStore } from "../../store/ProjectStore";
import ActionButtons from "../UI/ActionButtons";
import ProjectForm from "../ProjectForm/ProjectForm";

export default function ProjectsBoard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isAddProjectFormModalOpen, setIsAddProjectFormModalOpen] =
    useState(false);

  const { projects, fetchUserProjects } = useProjectStore();

  console.log("User projects:", projects);
  useEffect(() => {
    fetchUserProjects();
  }, [fetchUserProjects]);

  const handleEditAll = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    setIsEditClicked((prevIsEditClicked) => !prevIsEditClicked);
    console.log("Edit action triggered");
  };

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
            rightButtonLabel="Wykres"
            leftButtonLink="/projects"
            rightButtonLink="/wykres"
          />
        </Grid>

        <ActionButtons
          handleAdd={handleAddProject}
          handleEditAll={handleEditAll}
        >
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
            project={project}
            handleTaskClick={() => {}}
            isEditClicked={isEditClicked}
          />
        ))}
      </Grid>

      <ProjectForm
        isOpen={isAddProjectFormModalOpen}
        handleClose={handleAddProjectFormClose}
        mode="add"
      />
    </>
  );
}
