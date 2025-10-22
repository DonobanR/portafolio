import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@shared': fileURLToPath(new URL('./shared', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'server/**'],
    coverage: {
      reporter: ['text', 'html'],
      provider: 'v8'
    }
  }
});
