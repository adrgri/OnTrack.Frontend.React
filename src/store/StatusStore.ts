import { create } from "zustand";
import axios from "axios";
import { Status } from "../types";

interface StatusState {
  statuses: Status[];
  fetchStatuses: () => Promise<void>;
}

const apiUrl = import.meta.env.VITE_API_URL;

export const useStatusStore = create<StatusState>((set) => ({
  statuses: [],

  fetchStatuses: async () => {
    try {
      const response = await axios.get(`${apiUrl}/status`);
      set({ statuses: response.data });
    } catch (error) {
      console.error("Failed to fetch statuses:", error);
    }
  },
}));
