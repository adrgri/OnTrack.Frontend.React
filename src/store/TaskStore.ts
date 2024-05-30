import { create } from "zustand";
import axios from "axios";
import { Project, Task } from "../types";
import { api } from "../api/api";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  fetchUserTasks: (projectId?: string) => Promise<void>;
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
      set({
        loading: false,
        error: "Nie udało się wyświetlić zadań. Spróbuj ponownie później",
      });
    }
  },

  fetchUserTasks: async (projectId) => {
    set({ loading: true, error: null });
    try {
      const userResponse = await api.get(`${apiUrl}/user/me`);
      const userTaskIds = userResponse.data.taskIds;

      let tasks = [];
      if (projectId) {
        const projectResponse = await api.get(`${apiUrl}/project/${projectId}`);
        const taskIds = projectResponse.data.map(
          (project: Project) => project.taskIds
        );

        if (taskIds.length > 0) {
          const taskResponse = await api.get(`${apiUrl}/task/${taskIds}`);
          tasks = taskResponse.data;
        }
      } else {
        if (userTaskIds.length > 0) {
          const taskResponse = await api.get(`${apiUrl}/task`);
          tasks = taskResponse.data.filter((task: Task) =>
            userTaskIds.includes(task.id)
          );
        }
      }

      set({ tasks, loading: false });
      console.log("Tasks fetched successfully");
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      set({
        loading: false,
        error: "Nie udało się wyświetlić zadań. Spróbuj ponownie później",
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
