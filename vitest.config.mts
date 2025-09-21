import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/tests/setupFile.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/*.config.{js,mjs,ts}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'src/middleware.ts',
        'src/firebase.ts',
        'src/firebaseAdmin.ts',
        '.next/',
        'src/lib/stores/**',
        'src/types/**',
        'src/app/api/**',
        'src/lib/schemas/**', 
        'src/utils/**', 
        'src/firebase.ts',
        'src/firebaseAdmin.ts',
        'eslint.config.mjs',
        'next.config.ts',
        'postcss.config.mjs',
        'vitest.config.mts',
        '**/*.d.ts',
      ],
    },
  },
})
