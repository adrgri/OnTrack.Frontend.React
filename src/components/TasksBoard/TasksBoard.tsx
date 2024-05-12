import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TaskInfoModel from "../TaskInfoModal/TaskInfoModal";
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
  const [isTaskInfoModelOpen, setIsTaskInfoModelOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isEditClicked, setIsEditClicked] = useState(false);

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
      if (task?.id) {
        updateTaskStatus(task.id, destination.droppableId as Status);
      }
    }
  };

  const handleTaskClick = (
    taskId: string,
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
    setSelectedTaskId(taskId);
    setIsTaskInfoModelOpen(true);
    console.log("Task clicked:", taskId);
  };

  const handleEdit = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    setIsEditClicked((prevIsEditClicked) => !prevIsEditClicked);
    console.log("Edit action triggered");
  };

  const handleAddTask = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    setIsTaskInfoModelOpen(true);
  };

  function handleCancel() {
    setIsTaskInfoModelOpen(false);
  }

  function handleTaskInfoModalClose() {
    setIsTaskInfoModelOpen(false);
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
                isEditClicked={isEditClicked}
              />
            </Grid>
          ))}
        </Grid>
      </DragDropContext>

      <TaskInfoModel
        isOpen={isTaskInfoModelOpen}
        handleClose={handleTaskInfoModalClose}
        onCancel={handleCancel}
        taskId={selectedTaskId}
      />
    </>
  );
};

export default TasksBoard;
