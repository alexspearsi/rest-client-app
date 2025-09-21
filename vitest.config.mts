import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    name: 'jsdom',
    environment: 'jsdom',
    setupFiles: ['src/tests/setupFile.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/*.config.{js,mjs,ts}'],
    coverage: {
      provider: 'v8',
      enabled: true,
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/main.tsx',
        'src/app/**/*.{js,jsx,ts,tsx}',
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/index.{js,jsx,ts,tsx}',
        'src/setupTests.{js,ts}',
        'src/**/*.d.ts',
        'src/components/**/types.ts',
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
});
