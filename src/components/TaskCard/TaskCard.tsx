import React from "react";
import { Typography, Grid } from "@mui/material";
import { useTaskStore } from "../../store/TaskStore";
import DateChip from "../CardComponents/DateChip";
import MembersAvatarsRow from "../CardComponents/MembersAvatarsRow";
import GenericCard from "../GenericCard/GenericCard";
import EntityIcon from "../CardComponents/EntityIcon";

type TaskCardProps = {
  taskId: string;
  handleTaskClick: () => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ taskId, handleTaskClick }) => {
  const task = useTaskStore((state) =>
    state.tasks.find((t) => t.id === taskId)
  );

  return (
    <GenericCard onClick={handleTaskClick}>
      <Grid container direction="column" spacing={1}>
        <Grid item xs={12} mb={2} container alignItems="center">
          <Typography>{task?.name}</Typography>
          <EntityIcon
            icon={task?.icon}
            style={{ width: "15px", height: "15px", marginLeft: "5px" }}
          />
        </Grid>

        <Grid item container xs={12} alignItems="center" spacing={2}>
          <Grid item xs={true}>
            {<DateChip date={task?.endDate ?? null} />}
          </Grid>

          <Grid item xs={true} container justifyContent="flex-end">
            <MembersAvatarsRow members={task?.members ?? []} />
          </Grid>
        </Grid>
      </Grid>
    </GenericCard>
  );
};

export default TaskCard;
