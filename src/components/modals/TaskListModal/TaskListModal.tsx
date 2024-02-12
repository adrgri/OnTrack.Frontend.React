import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import PopupLayout from "../../layout/PopupLayout";
import SmallButton from "../../../styledComponents/SmallButton";
import { Task, TaskListItem } from "../../../types";
import StyledSidebarModalInput from "../../../styledComponents/StyledSidebarModalInput";

interface TaskListModalProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  addTaskList: (taskText: string, isChecked: boolean) => void;
}

const TaskListModal: React.FC<TaskListModalProps> = ({
  open,
  anchorEl,
  onClose,
  addTaskList,
}) => {
  const [tasksList, setTasksList] = useState<TaskListItem[]>([
    { id: Date.now(), text: "", isChecked: false },
  ]);

  const handleInputChange = (id: number, text: string) => {
    setTasksList(
      tasksList.map((task) => (task.id === id ? { ...task, text } : task))
    );
  };

  const handleAddTask = () => {
    tasksList.forEach((task) => {
      if (task.text.trim()) {
        addTaskList(task.text, task.isChecked);
      }
    });
    setTasksList([{ id: Date.now(), text: "", isChecked: false }]);
  };

  const handleAddMoreTasks = () => {
    setTasksList([
      ...tasksList,
      { id: Date.now(), text: "", isChecked: false },
    ]);
  };

  const handleKeyPress = (e: React.KeyboardEvent, task: Task) => {
    if (e.key === "Enter" && task.name.trim()) {
      handleAddTask(); // Add the current task
    }
  };

  return (
    <PopupLayout
      title="Lista zadań"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
    >
      {tasksList.map((task, index) => (
        <Box key={task.id}>
          <StyledSidebarModalInput
            fullWidth
            variant="filled"
            value={task.text}
            onChange={(e) => handleInputChange(task.id, e.target.value)}
            placeholder="Wpisz zadanie"
            onKeyPress={(e) => handleKeyPress(e, task)}
          />
          {index === tasksList.length - 1 && (
            <Typography
              variant="body2"
              sx={{
                cursor: "pointer",
                textAlign: "right",
                mt: 2,
                color: "#5E5F7D",
              }}
              onClick={handleAddMoreTasks}
            >
              Dodaj kolejne zadanie
            </Typography>
          )}
        </Box>
      ))}

      <SmallButton variant="contained" onClick={handleAddTask}>
        Dodaj
      </SmallButton>
    </PopupLayout>
  );
};

export default TaskListModal;
