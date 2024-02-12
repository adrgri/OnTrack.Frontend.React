import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "../TaskCard/TaskCard";
import { Typography, Box } from "@mui/material";

export const Column = ({ columnId, title, tasks }) => {
  return (
    <Droppable droppableId={columnId}>
      {(provided, snapshot) => (
        <Box
          {...provided.droppableProps}
          ref={provided.innerRef}
          sx={{
            backgroundColor: snapshot.isDraggingOver
              ? "#EEEFF6"
              : "transparent",
            padding: 2,
            width: {
              xs: 320, // Adjust width for extra-small screens
              md: 230, // Adjust width for small screens
              lg: 320, // Keep original width for large screens and above
            },
            minHeight: 500,
          }}
        >
          <Box sx={{ borderBottom: 2, borderColor: "primary.main", pb: 0.5 }}>
            <Typography variant="h6" sx={{ fontSize: "1.25rem" }}>
              {title}
            </Typography>
          </Box>
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TaskCard task={task} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};
