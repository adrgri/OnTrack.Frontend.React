import { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import TaskInfoModal from "../TaskInfoModal/TaskInfoModal";
import BoardNavigation from "../BoardNavigation/BoardNavigation";
import { useTaskStore } from "../../store/TaskStore";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Column } from "../Column/Column";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ActionButtons from "../UI/ActionButtons";
import { useStatusStore } from "../../store/StatusStore";
import { useProjectStore } from "../../store/ProjectStore";
import EditableText from "../EditableText/EditableText";
import { useFormik } from "formik";
import * as Yup from "yup";
import NoContent from "../NoContent/NoContent";
import Loading from "../Loading/Loading";

const columnTitles: Record<string, string> = {
  "4b56b08b-0ffc-4abd-85a6-5f6a9c9a1a48": "Do zrobienia",
  "48634561-9a5d-46d9-8afb-aad78a5dd625": "W trakcie",
  "000930a4-77f3-4707-8e69-8b193b0ac673": "Gotowy",
};

const projectValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(1, "Nazwa projektu musi zawierać co najmniej 1 znak.")
    .required("Nie możesz utworzyć projektu bez nazwy."),
});

const TasksBoard = ({ projectId }: { projectId?: string }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { tasks, fetchUserTasks, updateTask, loading, error } = useTaskStore();
  const { statuses, fetchStatuses } = useStatusStore();
  const { projects, fetchProjects, updateProject } = useProjectStore();
  const [isTaskInfoModalOpen, setIsTaskInfoModalOpen] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);

  useEffect(() => {
    fetchUserTasks(projectId);
    fetchStatuses();
    if (projectId) {
      fetchProjects();
    }
  }, [fetchUserTasks, fetchStatuses, fetchProjects, projectId]);

  const filteredTasksByProject = projectId
    ? tasks.filter((task) => task.projectId === projectId)
    : tasks;

  const selectedProject = projectId
    ? projects.find((project) => project.id === projectId)
    : null;

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
          destination.droppableId === "000930a4-77f3-4707-8e69-8b193b0ac673";
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

  const formik = useFormik({
    initialValues: {
      title: selectedProject?.title || "",
    },
    validationSchema: projectValidationSchema,
    onSubmit: async (values) => {
      if (selectedProject?.id) {
        await updateProject(selectedProject.id, {
          ...selectedProject,
          title: values.title,
        });
        console.log("Project title updated:", values.title);
      }
    },
    enableReinitialize: true,
  });

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
        {selectedProject && (
          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <EditableText
                text={formik.values.title}
                onTextChange={(newValue) =>
                  formik.setFieldValue("title", newValue)
                }
                onBlur={formik.handleSubmit} // Submit the form on input exit
                placeholder="Wpisz nazwę projektu..."
                sxInput={{
                  fontSize: "1.5rem",
                  color: theme.palette.primary.main,
                }}
                sxTypography={{
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  color: theme.palette.primary.main,
                }}
              />
            </Box>
          </Grid>
        )}

        <Grid item>
          <BoardNavigation
            leftButtonLabel="Moje zadania"
            rightButtonLabel="Wykres"
            leftButtonLink="/"
            rightButtonLink="/wykres"
          />
        </Grid>

        <ActionButtons
          handleAdd={handleAddTask}
          handleEditAll={handleEditAll}
          showAddButton={Boolean(projectId)} // Only show Edit button if projectId is provided
        >
          Zadanie
        </ActionButtons>
      </Grid>

      {loading ? (
        <Loading />
      ) : error ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      ) : filteredTasksByProject.length === 0 ? (
        projectId ? (
          <NoContent type="task" />
        ) : (
          <NoContent type="task" navigateTo="/projects" />
        )
      ) : (
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
      )}
      <TaskInfoModal
        isOpen={isTaskInfoModalOpen}
        onClose={handleTaskInfoModalClose}
        mode="add"
        projectId={projectId ?? ""}
      />
    </>
  );
};

export default TasksBoard;
