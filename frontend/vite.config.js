import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://server-indicraze.onrender.com", // Replace with your API server URL
        changeOrigin: true,
      },
    },
  },
});
