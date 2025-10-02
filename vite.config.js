import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE - PATH || "pharmacy-repo",
  server: {
    port: 3000,
  },
  optimizeDeps: {
    exclude: ["chartjs-adapter-date-fns"],
  },
});
// vite.config.js
