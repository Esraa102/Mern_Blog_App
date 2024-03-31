import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        changeOrigin: true,
        target: "http://localhost:5000",
      },
    },
  },
});
