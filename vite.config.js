import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 43210,
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:43211',
        changeOrigin: true,
      },
    },
  }
})
