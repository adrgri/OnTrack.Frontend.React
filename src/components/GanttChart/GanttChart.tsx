import React, { useEffect, useState } from "react";
import { useTaskStore } from "../../store/TaskStore"; // Adjust import path as necessary
import Chart from "react-google-charts";
import Loading from "../Loading/Loading";

const GanttChart = () => {
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const tasksFromStore = useTaskStore((state) => state.tasks);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    const columns = [
      { type: "string", label: "Task ID" },
      { type: "string", label: "Task Name" },
      { type: "date", label: "Start Date" },
      { type: "date", label: "End Date" },
      { type: "number", label: "Duration" },
      { type: "number", label: "Percent Complete" },
      { type: "string", label: "Dependencies" },
    ];

    const adaptedRows = tasksFromStore.map((task) => [
      task.id.toString(),
      task.name,
      new Date(task.startDate), // Assuming 'start' is a property of your Task
      new Date(task.dueDate), // Assuming 'end' is a property of your Task
      null, // Duration is null if start and end dates are used
      task.progress || 0, // Assuming 'progress' is a property of your Task
      task.dependencies?.join(",") || null, // Adjust based on your Task model
    ]);

    setChartData([columns, ...adaptedRows]);
  }, [tasksFromStore]);

  const options = {
    height: 400,
    gantt: {
      trackHeight: 30,
    },
  };

  return (
    <Chart
      width={"100%"}
      height={"300px"}
      chartType="Gantt"
      loader={<Loading />}
      data={chartData}
      options={options}
      rootProps={{ "data-testid": "2" }}
    />
  );
};

export default GanttChart;
