import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/elizabeth/'
  root: 'client',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
})
