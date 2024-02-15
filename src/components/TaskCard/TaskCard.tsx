import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Chip,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Task } from "../../types";
import { useTaskStore } from "../../store/TaskStore";

type TaskCardProps = {
  task: Task;
  handleTaskClick: () => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, handleTaskClick }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
    };
    return new Date(dateString).toLocaleDateString("pl-PL", options);
  };

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
      }}
      onClick={handleTaskClick}
    >
      <CardContent>
        <Grid container direction="column" spacing={1}>
          <Grid item xs={12} mb={2}>
            <Typography>{task.name}</Typography>
          </Grid>

          <Grid item container xs={12} alignItems="center" spacing={2}>
            <Grid item xs={true}>
              {task.dueDate && (
                <Chip
                  icon={<AccessTimeIcon />}
                  color="primary"
                  label={formatDate(task.dueDate)}
                  size="small"
                  sx={{
                    borderRadius: 0,
                    fontSize: "13px",
                  }}
                />
              )}
            </Grid>

            <Grid item xs={true} container justifyContent="flex-end">
              {task.members?.map((member) => (
                <Grid item key={member.id}>
                  <Avatar
                    src={"https://i.pravatar.cc/150?img=51"}
                    alt={`${member.firstName} ${member.lastName}`}
                    sx={{
                      width: 24,
                      height: 24,
                      marginLeft: 1,
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
