import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server:{
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8081',
    //     changeOrigin: true,
    //     rewrite: (path) => {
    //       const newPath = path.replace(/^\/api/, '');
    //       console.log(`Original path: ${path}, Rewritten path: ${newPath}`);
    //       return newPath;
    //     },
    //   },
    // }
  }
})
