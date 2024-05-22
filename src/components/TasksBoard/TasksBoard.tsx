import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TaskInfoModal from "../TaskInfoModal/TaskInfoModal";
import BoardNavigation from "../BoardNavigation/BoardNavigation";
import { useTaskStore } from "../../store/TaskStore";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Column } from "../Column/Column";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ActionButtons from "../UI/ActionButtons";
import { useStatusStore } from "../../store/StatusStore";

const columnTitles: Record<string, string> = {
  "f75fd79b-8ed2-4533-8d08-306aeee7fccb": "Do zrobienia",
  "bfb843bf-f595-4741-a0e0-c1e311f54f8d": "W trakcie",
  "a7c48d27-3d59-4425-b060-a754b0484826": "Gotowy",
};

const TasksBoard = ({ projectId }: { projectId?: string }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { tasks, fetchTasks, updateTask } = useTaskStore();
  const [isTaskInfoModalOpen, setIsTaskInfoModalOpen] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const { statuses, fetchStatuses } = useStatusStore();

  useEffect(() => {
    fetchTasks();
    fetchStatuses();
  }, [fetchTasks, fetchStatuses]);

  const filteredTasksByProject = projectId
    ? tasks.filter((task) => task.projectId === projectId)
    : tasks;

  const handleOnDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId !== destination.droppableId ||
      source.index !== destination.index
    ) {
      const task = tasks.find((t) => t.id === result.draggableId);
      if (task?.id) {
        const isCompleted =
          destination.droppableId === "a7c48d27-3d59-4425-b060-a754b0484826";
        const updatedTask = {
          ...task,
          statusId: destination.droppableId,
          isCompleted: isCompleted,
        };

        await updateTask(task.id, updatedTask);
        console.log("Task status updated:", updatedTask);
      }
    }
  };

  const handleEditAll = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    setIsEditClicked((prevIsEditClicked) => !prevIsEditClicked);
    console.log("Edit action triggered");
  };

  const handleAddTask = () => {
    setIsTaskInfoModalOpen(true);
  };

  function handleTaskInfoModalClose() {
    setIsTaskInfoModalOpen(false);
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
            rightButtonLabel="Wykres"
            leftButtonLink="/home"
            rightButtonLink="/wykres"
          />
        </Grid>

        <ActionButtons handleAdd={handleAddTask} handleEditAll={handleEditAll}>
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
                isEditClicked={isEditClicked}
              />
            </Grid>
          ))}
        </Grid>
      </DragDropContext>

      <TaskInfoModal
        isOpen={isTaskInfoModalOpen}
        onClose={handleTaskInfoModalClose}
        mode="add"
      />
    </>
  );
};

export default TasksBoard;
