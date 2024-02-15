import React, { useEffect, useState } from "react";
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
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

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

  const handleTaskClick = (taskId) => {
    // Find the task by id and set it as the selected task
    const task = tasks.find((task) => task.id === taskId);
    setSelectedTask(task);
    setIsAddTaskModalOpen(true);
    console.log("Selected task:", task);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="baseline"
        justifyContent="space-between"
        // sx={{ padding: 1 }}
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
              alignItems: "flex-start",
            },
            [theme.breakpoints.down("md")]: {
              alignItems: "center",
            },
          }}
        >
          {Object.entries(columnTitles).map(([columnKey, title]) => (
            <Grid item sm={12} md={3} key={columnKey}>
              <Column
                columnId={columnKey}
                title={title}
                tasks={tasks.filter((task) => task.status === columnKey)}
                handleTaskClick={handleTaskClick}
              />
            </Grid>
          ))}
        </Grid>
      </DragDropContext>

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        handleClose={() => {
          setIsAddTaskModalOpen(false);
          setSelectedTask(null); // Reset selected task on close
        }}
        onAddTask={addTask}
        selectedTask={selectedTask}
      />
    </>
  );
};

export default TasksBoard;
