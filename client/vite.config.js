import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG'],
  server: {
    host: true, // Allow access from local network (mobile phone)
    port: 5173, // optional: default port
    hmr: {
      overlay: false, // Disable error overlay
    },
  },
})
