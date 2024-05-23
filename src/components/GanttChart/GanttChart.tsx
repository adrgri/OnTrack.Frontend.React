import { useEffect, useState, useMemo } from "react";
import Gantt, {
  Tasks,
  // Dependencies,
  // Resources,
  // ResourceAssignments,
  Column,
  Editing,
  Validation,
} from "devextreme-react/gantt";
import BoardNavigation from "../BoardNavigation/BoardNavigation.tsx";
import { useTaskStore } from "../../store/TaskStore.ts";
import { useProjectStore } from "../../store/ProjectStore.ts";
import Loading from "../Loading/Loading.tsx";

const GanttChart = () => {
  const { tasks, fetchTasks } = useTaskStore();
  const { projects, fetchUserProjects } = useProjectStore();
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoadingTasks(true);
      setLoadingProjects(true);
      try {
        await fetchTasks();
        await fetchUserProjects();
      } finally {
        setLoadingTasks(false);
        setLoadingProjects(false);
      }
    };

    loadData();
  }, [fetchTasks, fetchUserProjects]);

  const transformedTasks = useMemo(
    () =>
      tasks.map((task) => ({
        id: task.id,
        parentId: task.projectId,
        title: task.title,
        start: task.startDate ? new Date(task.startDate) : null,
        end: task.dueDate ? new Date(task.dueDate) : null,
        progress: task.isCompleted ? 100 : 0,
        includeInChart: !!(task.startDate && task.dueDate),
      })),
    [tasks]
  );

  const transformedProjects = useMemo(
    () =>
      projects.map((project) => {
        if (typeof project.id === "undefined") {
          throw new Error("Project id is undefined");
        }
        return {
          id: project.id,
          parentId: 0,
          title: project.title,
          start: null,
          end: null,
          progress: 0,
          includeInChart: true,
        };
      }),
    [projects]
  );

  const projectsWithDates = useMemo(
    () =>
      transformedProjects.map((project) => {
        const projectTasks = transformedTasks.filter(
          (task) => task.parentId === project.id && task.start && task.end
        );

        if (projectTasks.length === 0)
          return { ...project, start: null, end: null };

        const startDate = new Date(
          Math.min(
            ...projectTasks.map((task) =>
              task.start ? task.start.getTime() : Infinity
            )
          )
        );
        const endDate = new Date(
          Math.max(
            ...projectTasks.map((task) =>
              task.end ? task.end.getTime() : -Infinity
            )
          )
        );

        return { ...project, start: startDate, end: endDate };
      }),
    [transformedTasks, transformedProjects]
  );

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, "0")}.${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${d.getFullYear()}`;
  };

  return (
    <>
      <BoardNavigation
        leftButtonLabel="Moje zadania"
        rightButtonLabel="Wykres"
        leftButtonLink="/"
        rightButtonLink="/wykres"
      />

      {loadingTasks || loadingProjects ? (
        <Loading />
      ) : (
        <Gantt taskListWidth={500} scaleType="weeks" height={600} rootValue={0}>
          <Tasks dataSource={[...projectsWithDates, ...transformedTasks]} />
          {/* <Dependencies dataSource={dependencies} />
        <Resources dataSource={resources} />
        <ResourceAssignments dataSource={resourceAssignments} /> */}

          <Column dataField="title" caption="Nazwa" width={200} />
          <Column
            dataField="start"
            caption="Data rozpoczęcia"
            cellRender={({ value }) => formatDate(value)}
          />
          <Column
            dataField="end"
            caption="Data zakończenia"
            cellRender={({ value }) => formatDate(value)}
          />

          <Validation autoUpdateParentTasks />
          <Editing enabled={false} />
        </Gantt>
      )}
    </>
  );
};

export default GanttChart;
