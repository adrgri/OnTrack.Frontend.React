import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

function ListTasks({ tasks2, setTasks2 }) {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    const filterTodos = tasks2.filter((task) => task.status === "todo");
    const filterInProgress = tasks2.filter(
      (task) => task.status === "inProgress"
    );
    const filterClosed = tasks2.filter((task) => task.status === "closed");

    setTodos(filterTodos);
    setInProgress(filterInProgress);
    setClosed(filterClosed);
  }, [tasks2]);

  const statuses = ["todo", "inProgress", "closed"];

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks2={tasks2}
          setTasks2={setTasks2}
          todos={todos}
          inProgress={inProgress}
          closed={closed}
        />
      ))}
    </div>
  );
}

export default ListTasks;

const Section = ({ status, tasks2, setTasks2, todos, inProgress, closed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Todo";
  let tasksToMap = todos;

  if (status === "inProgress") {
    text = "In Progress";
    tasksToMap = inProgress;
  }
  if (status === "closed") {
    text = "Closed";
    tasksToMap = closed;
  }

  const addItemToSection = (id) => {
    console.log("dropped", id, status);

    setTasks2((prev) => {
      const modifiedTasks = prev.map((task) => {
        if (task.id === id) {
          return { ...task, status: status };
        }
        return task;
      });

      localStorage.setItem("tasks", JSON.stringify(modifiedTasks));
      return modifiedTasks;
    });
  };

  return (
    <div ref={drop} style={{ backgroundColor: isOver ? "slategray" : "" }}>
      <Header text={text} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task
            key={task.id}
            task={task}
            tasks2={tasks2}
            setTasks2={setTasks2}
          />
        ))}
    </div>
  );
};

const Header = ({ text, count }) => {
  return (
    <div>
      {text} {count}
    </div>
  );
};

const Task = ({ task, tasks2, setTasks2 }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  console.log(isDragging);

  return (
    <div ref={drag}>
      <div>{task.name}</div>
    </div>
  );
};
