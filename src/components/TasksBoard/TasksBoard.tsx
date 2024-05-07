import { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import EditIcon from "../../assets/icons/EditIcon.svg";
import AddTaskModal from "../TaskInfoModal/TaskInfoModal";
import BoardNavigation from "../BoardNavigation/BoardNavigation";
import { useTaskStore } from "../../store/TaskStore";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Column } from "../Column/Column";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Status } from "../../types";
import ActionButtons from "../UI/ActionButtons";

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
        updateTaskStatus(task.id, destination.droppableId as Status);
      }
    }
  };

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsAddTaskModalOpen(true);
  };

  const handleEdit = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    console.log("Edit action triggered");
  };

  const handleAddTask = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    setIsAddTaskModalOpen(true);
  };

  function handleCancel() {
    setIsAddTaskModalOpen(false);
  }

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

        <ActionButtons handleAdd={handleAddTask} handleEdit={handleEdit}>
          Zadanie
        </ActionButtons>
      </Grid>

      <ActionButtons handleAdd={handleAddTask} handleEdit={handleEdit}>
        Zadanie
      </ActionButtons>

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
        onCancel={handleCancel}
        taskId={selectedTaskId}
      />
    </>
  );
};

export default TasksBoard;
