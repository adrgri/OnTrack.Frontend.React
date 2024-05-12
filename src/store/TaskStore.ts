import { create } from "zustand";
import axios from "axios";
import { Status, Task } from "../types";

interface TaskState {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (newTaskData: Task) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  getTaskById: (id: string) => Task | undefined;
  updateTaskStatus: (taskId: string, newStatus: Status) => Promise<void>;
}

const apiUrl = import.meta.env.VITE_API_URL;

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],

  getTaskById: (id) => get().tasks.find((task) => task.id === id),

  fetchTasks: async () => {
    try {
      const response = await axios.get(`${apiUrl}/task`);
      set({ tasks: response.data });
      console.log("Tasks fetched successfully");
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  },

  addTask: async (newTaskData) => {
    try {
      const response = await axios.post(`${apiUrl}/task`, newTaskData);
      const newTask = response.data;
      set((state) => ({ tasks: [...state.tasks, newTask] }));
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  },

  updateTask: async (taskId, updates) => {
    try {
      await axios.put(`${apiUrl}/task`, updates);
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
      await axios.delete(`${apiUrl}/task/${taskId}`);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      }));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  },

  updateTaskStatus: async (taskId: string, newStatusId) => {
    const taskToUpdate = get().tasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, statusId: String(newStatusId) };
      await axios.put(`${apiUrl}/task`, updatedTask);
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? updatedTask : task
        ),
      }));
    }
  },
}));
