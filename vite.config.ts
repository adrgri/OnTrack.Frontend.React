import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/OnTrack.Frontend.React",
  plugins: [react()],
  server: {
    // host: "192.168.0.213",
    port: 3000,
  },
});
