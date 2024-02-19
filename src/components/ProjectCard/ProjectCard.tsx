import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
  Stack,
} from "@mui/material";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { useProjectStore } from "../../store/ProjectStore";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import TasksIcon from "../../assets/icons/TasksIcon.svg";
import DateChip from "../CardComponents/DateChip";

interface TaskCardProps {
  projectId: string;
  handleTaskClick: () => void;
}

type ProjectCardProps = TaskCardProps & CircularProgressProps;

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectId,
  handleTaskClick,
  ...circularProgressProps
}) => {
  const project = useProjectStore((state) =>
    state.projects.find((p) => p.id === projectId)
  );

  const progress = project?.progress ?? 0;

  const formatDate = (date: dayjs.Dayjs | null) => {
    if (!date) {
      return "";
    }

    return date.format("DD MMM");
  };

  const additionalMembersCount = (project?.members?.length || 0) - 2;

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

            <Grid item xs={12} mb={2} alignItems="center">
              {project && project?.members?.length > 0 && (
                <Stack spacing={2} mb={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Zespół
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                      pt: 1,
                    }}
                  >
                    {project?.members?.slice(0, 2).map((user, index) => (
                      <Avatar
                        key={user.id}
                        src={user.avatar}
                        alt={`${user.firstName} ${user.lastName}`}
                        sx={{
                          width: 40,
                          height: 40,
                          border: "2px solid white",
                          position: "absolute",
                          left: `${index * 25}px`,
                          zIndex: 1,
                        }}
                      />
                    ))}

                    {additionalMembersCount > 0 && (
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: "grey",
                          borderRadius: "50%",
                          position: "absolute",
                          left: `${2 * 25}px`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 0,
                        }}
                      >
                        <Typography color="white">{`+${additionalMembersCount}`}</Typography>
                      </Box>
                    )}
                  </Box>
                </Stack>
              )}
            </Grid>

            <Grid item container xs={12} alignItems="center" spacing={2}>
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
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                {/* Background circle */}
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={100}
                  sx={{
                    color: "#5E5F7D",
                  }}
                />
                {/* Progress circle */}
                <CircularProgress
                  variant="determinate"
                  {...circularProgressProps}
                  value={progress}
                  size={100}
                  sx={{
                    position: "absolute",
                    left: 0,
                  }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    color="primary.main"
                  >{`${Math.round(progress)}%`}</Typography>
                </Box>
              </Box>
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
