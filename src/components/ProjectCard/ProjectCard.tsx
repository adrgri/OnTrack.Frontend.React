import React from "react";
import { Card, CardContent, Typography, Grid, Stack } from "@mui/material";
import { useProjectStore } from "../../store/ProjectStore";
import TasksIcon from "../../assets/icons/TasksIcon.svg";
import DateChip from "../CardComponents/DateChip";
import CircularProgressWithLabel from "../CardComponents/CircularProgressWithLabel";
import MembersAvatarsRow from "../CardComponents/MembersAvatarsRow";

interface TaskCardProps {
  projectId: string;
  handleTaskClick: () => void;
}

const ProjectCard: React.FC<TaskCardProps> = ({
  projectId,
  handleTaskClick,
}) => {
  const project = useProjectStore((state) =>
    state.projects.find((p) => p.id === projectId)
  );

  const progress = project?.progress ?? 0;

  return (
    <Card
      sx={{
        my: 2,
        boxShadow: 3,
        transition: "border-color 0.4s ease-in-out",
        border: 2,
        borderRadius: "5px",
        borderColor: "transparent",
        "&:hover": {
          borderColor: "primary.main",
        },
        width: "400px",
      }}
      onClick={handleTaskClick}
    >
      <CardContent>
        <Grid
          container
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Grid item direction="column" spacing={2}>
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

          <Grid
            item
            direction="column"
            spacing={2}
            alignItems="center"
            justifyContent={"space-between"}
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
                {project?.tasksAmount === 1
                  ? `${project?.tasksAmount} zadanie`
                  : `${project?.tasksAmount} zadań`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
