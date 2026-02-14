import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Base path para GitHub Pages (project page: username.github.io/REPO_NAME/)
const base = process.env.VITE_BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
})

