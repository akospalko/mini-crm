import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1/clients": {
        target: "http://localhost:8001",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      "/api/v1/properties": {
        target: "http://localhost:8001",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      "/api/v1/form-templates": {
        target: "http://localhost:8001",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  plugins: [react()],
});