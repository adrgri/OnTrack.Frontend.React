import { create } from "zustand";
import axios from "axios";
import { Task, Status } from "../types";

interface TaskState {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (newTaskData: Task) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  updateTaskStatus: (taskId: string, newStatus: Status) => Promise<void>;
  getTasksByStatus: (status: string) => Task[];
  getTaskById: (id: string) => Task | undefined;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],

  getTaskById: (id) => get().tasks.find((task) => task.id === id),

  fetchTasks: async () => {
    try {
      const response = await axios.get("http://localhost:3001/tasks");
      set({ tasks: response.data });
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  },

  addTask: async (newTaskData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/tasks",
        newTaskData
      );
      const newTask = response.data;
      set((state) => ({ tasks: [...state.tasks, newTask] }));
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  },

  updateTask: async (taskId, updates) => {
    try {
      await axios.put(`http://localhost:3001/tasks/${taskId}`, updates);
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, ...updates } : task
        ),
      }));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  },

  deleteTask: async (taskId) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${taskId}`);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      }));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  },

  getTasksByStatus: (status) => {
    const allTasks = get().tasks;
    return allTasks.filter((task) => task.status === status);
  },

  updateTaskStatus: async (taskId: string, newStatus: Status) => {
    const taskToUpdate = get().tasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, status: newStatus };
      await axios.put(`http://localhost:3001/tasks/${taskId}`, updatedTask);
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? updatedTask : task
        ),
      }));
    }
  },
}));
