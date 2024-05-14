import { useEffect, useState } from "react";
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
import TaskTooltipTemplate from "./TaskTooltipTemplate.tsx";
import { useTaskStore } from "../../store/TaskStore.ts";
import { useProjectStore } from "../../store/ProjectStore.ts";

const GanttChart = () => {
  const { tasks, fetchTasks } = useTaskStore();
  const { projects, fetchProjects } = useProjectStore();
  const [ganttTasks, setGanttTasks] = useState([]);
  const [ganttProjects, setGanttProjects] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      await fetchTasks();
      await fetchProjects();
    };

    loadData();
  }, [fetchTasks, fetchProjects]);

  useEffect(() => {
    const transformData = () => {
      const transformedTasks = tasks.map((task) => ({
        id: task.id,
        parentId: task.projectId,
        title: task.title,
        start: task.startDate ? new Date(task.startDate) : null,
        end: task.dueDate ? new Date(task.dueDate) : null,
        progress: task.isCompleted ? 100 : 0,
        includeInChart: !!(task.startDate && task.dueDate),
      }));

      const calculateProjectDates = (tasks, projects) => {
        return projects.map((project) => {
          const projectTasks = tasks.filter(
            (task) => task.parentId === project.id && task.start && task.end
          );

          if (projectTasks.length === 0)
            return { ...project, startDate: null, dueDate: null };

          const startDate = new Date(
            Math.min(...projectTasks.map((task) => task.start.getTime()))
          );
          const dueDate = new Date(
            Math.max(...projectTasks.map((task) => task.end.getTime()))
          );

          return { ...project, start: startDate, end: dueDate };
        });
      };

      const transformedProjects = calculateProjectDates(
        transformedTasks,
        projects
      ).map((project) => ({
        id: project.id,
        parentId: 0,
        title: project.title,
        start: project.start,
        end: project.end,
        progress: 100,
      }));

      setGanttProjects(transformedProjects);
      setGanttTasks(transformedTasks.filter((task) => task.includeInChart));
    };

    transformData();
  }, [tasks, projects]);

  const formatDate = (date) => {
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
        leftButtonLink="/home"
        rightButtonLink="/wykres"
      />
      <Gantt
        taskListWidth={500}
        scaleType="weeks"
        height={600}
        rootValue={0}
        taskTooltipContentTemplate={TaskTooltipTemplate}
      >
        <Tasks dataSource={[...ganttProjects, ...ganttTasks]} />
        {/* <Dependencies dataSource={dependencies} />
        <Resources dataSource={resources} />
        <ResourceAssignments dataSource={resourceAssignments} /> */}

        <Column dataField="title" caption="Nazwa" width={200} />
        <Column
          dataField="start"
          caption="Data rozpoczęcia"
          cellRender={({ value }) => formatDate(value)}
        />
        <Column
          dataField="end"
          caption="Data zakończenia"
          cellRender={({ value }) => formatDate(value)}
        />

        <Validation autoUpdateParentTasks />
        <Editing enabled={false} />
      </Gantt>
    </>
  );
};

export default GanttChart;
