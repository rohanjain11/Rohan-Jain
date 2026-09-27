import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  /* Served from the custom domain root (rohanjain.me), so no /Rohan-Jain/ prefix. */
  base: '/',
}))
