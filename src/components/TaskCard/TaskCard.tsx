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
import { useTaskStore } from "../../store/TaskStore";
import dayjs from "dayjs";
import "dayjs/locale/pl";

type TaskCardProps = {
  taskId: string;
  handleTaskClick: () => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ taskId, handleTaskClick }) => {
  const task = useTaskStore((state) =>
    state.tasks.find((t) => t.id === taskId)
  );

  const formatDate = (date: dayjs.Dayjs | null) => {
    if (!date) {
      return "";
    }

    return date.format("DD MMM");
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
          <Grid item xs={12} mb={2} container alignItems="center">
            <Typography>{task?.name}</Typography>
            {task?.icon && (
              <img
                src={task.icon.imageUrl}
                alt={task.icon.iconName}
                style={{
                  width: "15px",
                  height: "15px",
                  marginLeft: "5px",
                }}
              />
            )}
          </Grid>

          <Grid item container xs={12} alignItems="center" spacing={2}>
            <Grid item xs={true}>
              {task?.endDate && (
                <Chip
                  icon={<AccessTimeIcon />}
                  color="primary"
                  label={formatDate(dayjs(task.endDate))}
                  size="small"
                  sx={{
                    borderRadius: 0,
                    fontSize: "13px",
                  }}
                />
              )}
            </Grid>

            <Grid item xs={true} container justifyContent="flex-end">
              {task?.members?.map((member) => (
                <Grid item key={member.id}>
                  <Avatar
                    src={member.avatar}
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
