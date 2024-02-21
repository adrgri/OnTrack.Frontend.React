import { create } from "zustand";
import axios from "axios";
import { Status } from "../types";

interface StatusState {
  statuses: Status[];
  fetchStatuses: () => Promise<void>;
}

export const useStatusStore = create<StatusState>((set) => ({
  statuses: [],

  fetchStatuses: async () => {
    try {
      const response = await axios.get("http://localhost:3001/status");
      set({ statuses: response.data });
    } catch (error) {
      console.error("Failed to fetch statuses:", error);
    }
  },
}));
