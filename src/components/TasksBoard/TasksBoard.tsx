import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TaskInfoModel from "../TaskInfoModal/TaskInfoModal";
import BoardNavigation from "../BoardNavigation/BoardNavigation";
import { useTaskStore } from "../../store/TaskStore";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Column } from "../Column/Column";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ActionButtons from "../UI/ActionButtons";
import { useStatusStore } from "../../store/StatusStore";
import { Status } from "../../types";

const columnTitles: Record<string, string> = {
  "f75fd79b-8ed2-4533-8d08-306aeee7fccb": "Do zrobienia",
  "bfb843bf-f595-4741-a0e0-c1e311f54f8d": "W trakcie",
  "a7c48d27-3d59-4425-b060-a754b0484826": "Gotowy",
};

const TasksBoard = ({ projectId }: { projectId?: string }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { tasks, fetchTasks, updateTaskStatus } = useTaskStore();
  const [isTaskInfoModelOpen, setIsTaskInfoModelOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const { statuses, fetchStatuses } = useStatusStore();

  useEffect(() => {
    fetchTasks();
    fetchStatuses();
  }, [fetchTasks, fetchStatuses]);

  const filteredTasksByProject = projectId
    ? tasks.filter((task) => task.projectId === projectId)
    : tasks;

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log("Result:", result);
    console.log("Destination:", destination);

    if (!destination) {
      return;
    }

    if (
      source.droppableId !== destination.droppableId ||
      source.index !== destination.index
    ) {
      const task = tasks.find((t) => t.id === result.draggableId);
      if (task?.id) {
        const status: Status = {
          id: destination.droppableId,
          name: columnTitles[destination.droppableId],
        };
        updateTaskStatus(task.id, status);
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

      <DragDropContext onDragEnd={handleOnDragEnd}>
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
          {statuses.map((status) => (
            <Grid item sm={12} md={3} key={status.id}>
              <Column
                columnId={status.id}
                title={columnTitles[status.id] || status.name}
                tasks={filteredTasksByProject.filter(
                  (task) => task.statusId === status.id
                )}
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
        taskId={selectedTaskId}
      />
    </>
  );
};

export default TasksBoard;
