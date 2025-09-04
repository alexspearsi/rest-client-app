import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
 
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    name: 'jsdom',
    environment: 'jsdom',
    setupFiles: ['src/tests/setupFile.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/*.config.{js,mjs,ts}'],
  },
})