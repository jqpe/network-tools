import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { viteWranglerSpa } from '@torchauth/vite-plugin-wrangler-spa'

const TESTING = process.env.NODE_ENV === 'test'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
  },
  plugins: [
    react(),
    tsconfigPaths(),
    !TESTING && TanStackRouterVite(),
    !TESTING && viteWranglerSpa(),
  ],
})
