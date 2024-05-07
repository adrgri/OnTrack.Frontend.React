import React, { useState } from "react";
import { Typography, Grid, Box, IconButton } from "@mui/material";
import { useTaskStore } from "../../store/TaskStore";
import DateChip from "../CardComponents/DateChip";
import MembersAvatarsRow from "../CardComponents/MembersAvatarsRow";
import GenericCard from "../GenericCard/GenericCard";
import EntityIcon from "../CardComponents/EntityIcon";
import MenuDotsVertical from "../../assets/icons/MenuDotsVertical.svg";
import OptionsPopup from "../layout/OptionsPopup";

type TaskCardProps = {
  taskId: string;
  handleTaskClick: () => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ taskId, handleTaskClick }) => {
  const task = useTaskStore((state) =>
    state.tasks.find((t) => t.id === taskId)
  );

  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenModal = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation(); // Prevents the GenericCard's onClick from firing
    setAnchorEl(event.currentTarget as HTMLButtonElement);
    setOpenModal(true);
    console.log("Open modal");
  };

  const handleCloseModal = () => {
    setAnchorEl(null);
    setOpenModal(false);
    console.log("Close modal");
  };

  return (
    <GenericCard onClick={handleTaskClick}>
      <Grid container direction="column" spacing={1}>
        <Grid item xs={12} mb={2} container alignItems="center">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <Typography
                sx={{ fontSize: "1rem", color: "primary.main", mb: 1.5 }}
              >
                {"project?.name"}
              </Typography>
              <Typography variant="body1">{task?.name}</Typography>
            </Box>
            <IconButton aria-label="more options" onClick={handleOpenModal}>
              <img src={MenuDotsVertical} alt="Więcej opcji" />
            </IconButton>
          </Box>
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
      <OptionsPopup
        open={openModal}
        anchorEl={anchorEl}
        onClose={handleCloseModal}
        task={task}
      />
    </GenericCard>
  );
};

export default TaskCard;
