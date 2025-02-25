import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Adjust this to match your Vite dev server port
  },
});
