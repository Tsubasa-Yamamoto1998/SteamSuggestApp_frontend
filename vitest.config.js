import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
    define: {
      'import.meta.env.VITE_APP_CONFIRM_SUCCESS_URL': JSON.stringify(
        'http://localhost:5173/confirm',
      ),
    },
  }),
)
