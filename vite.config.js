import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'

export default defineConfig({
  base: isGitHubPages ? '/healthcare/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    allowedHosts:  ['083423e2770b.ngrok-free.app'],
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
