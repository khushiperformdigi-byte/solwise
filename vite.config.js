import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Ignore deploy zips and backend — prevents EBUSY crashes on Windows
    watch: {
      ignored: ['**/backend/**', '**/*.zip'],
    },
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
})
// Restart trigger comment
