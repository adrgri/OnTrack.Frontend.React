import React, { useEffect } from "react";
import { Grid, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import TaskBoardNavigation from "../TaskBoardNavigation/TaskBoardNavigation";
import { useTaskStore } from "../../store/TaskStore";
import { DragDropContext } from "react-beautiful-dnd";
import { Column } from "../Column/Column";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const columnTitles = {
  todo: "Do zrobienia",
  inProgress: "W trakcie",
  done: "Gotowy",
};

const TasksBoard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { tasks, fetchTasks, addTask, updateTaskStatus } = useTaskStore();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = React.useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId !== destination.droppableId ||
      source.index !== destination.index
    ) {
      // Call the updateTaskStatus method here
      const task = tasks.find((t) => t.id === result.draggableId);
      if (task) {
        updateTaskStatus(task.id, destination.droppableId);
      }
    }
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="baseline"
        justifyContent="space-between"
        sx={{ padding: 1 }}
      >
        <Grid item>
          <TaskBoardNavigation />
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
            Zadanie
          </Button>
        </Grid>
      </Grid>

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{
            flexDirection: isMobile ? "column" : "row",
            [theme.breakpoints.up("md")]: {
              alignItems: "flex-start", // For md screens and larger, use "flex-start" or another appropriate value
            },
            [theme.breakpoints.down("md")]: {
              alignItems: "center", // For screens smaller than md, align items to center
            },
          }}
        >
          {Object.entries(columnTitles).map(([columnKey, title]) => (
            <Grid item sm={12} md={3} key={columnKey}>
              <Column
                columnId={columnKey}
                title={title}
                tasks={tasks.filter((task) => task.status === columnKey)}
              />
            </Grid>
          ))}
        </Grid>
      </DragDropContext>

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        handleClose={() => setIsAddTaskModalOpen(false)}
        onAddTask={addTask}
      />
    </>
  );
};

export default TasksBoard;
