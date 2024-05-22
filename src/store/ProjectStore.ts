// TaskStore.js
import { create } from "zustand";
import { Project, Task } from "../types";
import { api } from "../api/api";

interface ProjectState {
  projects: Project[];
  tasks: Task[];
  loading: boolean;
  error: string | null;
  getProjectById: (id: string) => Project | undefined;
  fetchProjects: () => Promise<void>;
  fetchUserProjects: () => Promise<void>;
  addProject: (newProjectData: Project) => Promise<void>;
  updateProject: (
    projectId: string,
    updates: Partial<Project>
  ) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  fetchProjectProgress: (projectIds: string[]) => Promise<void>;
  projectProgress: Record<string, number>; // Store progress for each project
}

const apiUrl = import.meta.env.VITE_API_URL;

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  tasks: [],
  loading: false,
  error: null,
  projectProgress: {},

  getProjectById: (id) => get().projects.find((project) => project.id === id),

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`${apiUrl}/project`);
      set({ projects: response.data, loading: false });
      console.log("Projects fetched successfully");
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      set({ loading: false, error: "Failed to fetch projects" });
    }
  },

  fetchUserProjects: async () => {
    set({ loading: true, error: null });
    try {
      const userResponse = await api.get(`${apiUrl}/user/me`);
      const userProjectIds = userResponse.data.projectIds;

      if (userProjectIds && userProjectIds.length > 0) {
        const projectResponse = await api.get(`${apiUrl}/project`);
        const allProjects = projectResponse.data;
        const userProjects = allProjects.filter((project: Project) =>
          userProjectIds.includes(project.id)
        );
        set({ projects: userProjects, loading: false });
        console.log("User projects fetched successfully");
        // Fetch project progress for the user's projects
        get().fetchProjectProgress(userProjectIds);
      } else {
        set({ projects: [], loading: false });
      }
    } catch (error) {
      console.error("Failed to fetch user projects:", error);
      set({
        loading: false,
        error: "Nie udało się wyświetlić projektów. Spróbuj ponownie później",
      });
    }
  },

  fetchProjectProgress: async (projectIds) => {
    try {
      const response = await api.get(
        `${apiUrl}/project/progress/${projectIds.join(",")}`
      );
      const progressData = response.data.reduce(
        (
          acc: Record<string, number>,
          project: {
            id: string;
            progress: { completedItemsPercent: { value: number } };
          }
        ) => {
          acc[project.id] = project.progress.completedItemsPercent.value * 100; // Convert to percentage
          return acc;
        },
        {}
      );
      set({ projectProgress: progressData });
    } catch (error) {
      console.error("Failed to fetch project progress:", error);
    }
  },

  addProject: async (newProjectData) => {
    try {
      const response = await api.post(`${apiUrl}/project`, newProjectData);
      const newProject = response.data;
      set((state) => ({ projects: [...state.projects, newProject] }));
    } catch (error) {
      console.error("Failed to add project:", error);
    }
  },

  updateProject: async (projectId, updates) => {
    try {
      await api.put(`${apiUrl}/project`, updates);
      set((state) => ({
        projects: state.projects.map((project) =>
          project.id === projectId ? { ...project, ...updates } : project
        ),
      }));
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  },

  deleteProject: async (projectId) => {
    try {
      await api.delete(`${apiUrl}/project/${projectId}`);
      set((state) => ({
        projects: state.projects.filter((project) => project.id !== projectId),
      }));
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  },
}));
