import { useEffect, useState } from "react";
import BoardNavigation from "../BoardNavigation/BoardNavigation";
import { Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useProjectStore } from "../../store/ProjectStore";
import ProjectInfoModal from "../ProjectInfoModal/ProjectInfoModal";
import ActionButtons from "../UI/ActionButtons";

export default function ProjectsBoard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isProjectInfoModalOpen, setIsProjectInfoModalOpen] = useState(false);

  const { projects, fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  function handleAddProject() {
    setIsProjectInfoModalOpen(true);
  }

  function handleEdit() {
    console.log("Edit action triggered");
  }

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
    </>
  );
}
