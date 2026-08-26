import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // reachable via localhost, 127.0.0.1, and your phone on the same wifi
  },
})
