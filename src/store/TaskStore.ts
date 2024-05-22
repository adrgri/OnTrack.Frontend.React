import { create } from "zustand";
import axios from "axios";
import { Task } from "../types";
import { api } from "../api/api";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  fetchUserTasks: () => Promise<void>;
  addTask: (newTaskData: Task) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  getTaskById: (id: string) => Task | undefined;
}

const apiUrl = import.meta.env.VITE_API_URL;

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  getTaskById: (id) => get().tasks.find((task) => task.id === id),

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${apiUrl}/task`);
      set({ tasks: response.data, loading: false });
      console.log("Tasks fetched successfully");
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      set({ loading: false, error: "Failed to fetch tasks" });
    }
  },

  fetchUserTasks: async () => {
    set({ loading: true, error: null });
    try {
      const userResponse = await api.get(`${apiUrl}/user/me`);
      const userTaskIds = userResponse.data.taskIds;
      console.log("User Task IDs:", userTaskIds);

      if (userTaskIds && userTaskIds.length > 0) {
        const taskResponse = await axios.get(`${apiUrl}/task`);
        const allTasks = taskResponse.data;
        const userTasks = allTasks.filter((task: Task) =>
          userTaskIds.includes(task.id)
        );
        set({ tasks: userTasks, loading: false });
        console.log("User tasks fetched successfully:", userTasks);
      } else {
        set({ tasks: [], loading: false });
        console.log("No tasks found for user.");
      }
    } catch (error) {
      console.error("Failed to fetch user tasks:", error);
      set({
        loading: false,
        error: "Failed to fetch user tasks. Please try again later.",
      });
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
}));
