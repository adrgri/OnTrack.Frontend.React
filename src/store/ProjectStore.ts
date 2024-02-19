import { create } from "zustand";
import axios from "axios";
import { Project } from "../types";

interface ProjectState {
  projects: Project[];
  fetchProjects: () => Promise<void>;
  addProject: (newProjectData: Project) => Promise<void>;
  updateProject: (
    projectId: string,
    updates: Partial<Project>
  ) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  getProjectById: (id: string) => Project | undefined;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],

  getProjectById: (id) => get().projects.find((project) => project.id === id),

  fetchProjects: async () => {
    try {
      const response = await axios.get("http://localhost:3001/projects");
      set({ projects: response.data });
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  },

  addProject: async (newProjectData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/projects",
        newProjectData
      );
      const newProject = response.data;
      set((state) => ({ projects: [...state.projects, newProject] }));
    } catch (error) {
      console.error("Failed to add project:", error);
    }
  },

  updateProject: async (projectId, updates) => {
    try {
      await axios.put(`http://localhost:3001/projects/${projectId}`, updates);
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
      await axios.delete(`http://localhost:3001/projects/${projectId}`);
      set((state) => ({
        projects: state.projects.filter((project) => project.id !== projectId),
      }));
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  },
}));
