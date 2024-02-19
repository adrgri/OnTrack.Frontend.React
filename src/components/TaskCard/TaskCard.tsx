import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { useTaskStore } from "../../store/TaskStore";
import DateChip from "../CardComponents/DateChip";
import MembersAvatarsRow from "../CardComponents/MembersAvatarsRow";

type TaskCardProps = {
  taskId: string;
  handleTaskClick: () => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ taskId, handleTaskClick }) => {
  const task = useTaskStore((state) =>
    state.tasks.find((t) => t.id === taskId)
  );

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
              {task?.endDate && <DateChip date={task.endDate} />}
            </Grid>

            <Grid item xs={true} container justifyContent="flex-end">
              <MembersAvatarsRow members={task?.members ?? []} />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
