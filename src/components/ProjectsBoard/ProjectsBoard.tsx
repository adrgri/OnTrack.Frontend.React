import { useEffect, useState } from "react";
import BoardNavigation from "../BoardNavigation/BoardNavigation";
import { Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useProjectStore } from "../../store/ProjectStore";

export default function ProjectsBoard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const { projects, fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
        <Grid item>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            sx={{
              padding: "5px 20px",
              fontSize: "14px",
              zIndex: 2,
              borderRadius: "5px",
            }}
            onClick={() => setIsAddTaskModalOpen(true)}
          >
            Projekt
          </Button>
        </Grid>
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
    </>
  );
}
