import { create } from "zustand";
import { Project } from "../types";
import { api } from "../api/api";

interface ProjectState {
  projects: Project[];
  fetchProjects: () => Promise<void>;
  fetchUserProjects: () => Promise<void>;
  addProject: (newProjectData: Project) => Promise<void>;
  updateProject: (
    projectId: string,
    updates: Partial<Project>
  ) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  getProjectById: (id: string) => Project | undefined;
}

const apiUrl = import.meta.env.VITE_API_URL;

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],

  getProjectById: (id) => get().projects.find((project) => project.id === id),

  fetchProjects: async () => {
    try {
      const response = await api.get(`${apiUrl}/project`);
      set({ projects: response.data });
      console.log("Projects fetched successfully");
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  },

  fetchUserProjects: async () => {
    try {
      const userResponse = await api.get(`${apiUrl}/user/me`);
      const userProjectIds = userResponse.data.projectIds;

      if (userProjectIds && userProjectIds.length > 0) {
        const projectResponse = await api.get(`${apiUrl}/project`);
        const allProjects = projectResponse.data;
        const userProjects = allProjects.filter((project: Project) =>
          userProjectIds.includes(project.id)
        );
        set({ projects: userProjects });
        console.log("User projects fetched successfully");
      } else {
        set({ projects: [] });
      }
    } catch (error) {
      console.error("Failed to fetch user projects:", error);
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
