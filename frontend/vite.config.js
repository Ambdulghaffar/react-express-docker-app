import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Force la détection des changements sous Windows/Docker
    },
    host: true, // Permet l'accès depuis l'extérieur du container
    port: 5173,
  },
})
