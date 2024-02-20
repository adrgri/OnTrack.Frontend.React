import { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import AddTaskModal from "../TaskInfoModal/TaskInfoModal";
import BoardNavigation from "../BoardNavigation/BoardNavigation";
import { useTaskStore } from "../../store/TaskStore";
import { DragDropContext } from "react-beautiful-dnd";
import { Column } from "../Column/Column";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { DropResult } from "react-beautiful-dnd";

const columnTitles = {
  todo: "Do zrobienia",
  inProgress: "W trakcie",
  done: "Gotowy",
};

const TasksBoard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { tasks, fetchTasks, updateTaskStatus } = useTaskStore();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const onDragEnd = (result: DropResult) => {
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

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsAddTaskModalOpen(true);
  };

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
            leftButtonLabel="Moje zadania"
            rightButtonLabel="Tablica"
            leftButtonLink="/home"
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
          setSelectedTaskId(null);
        }}
        taskId={selectedTaskId}
      />
    </>
  );
};

export default TasksBoard;
