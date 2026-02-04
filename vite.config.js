import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const isAnalyze = env.VITE_ANALYZE === 'true'

  return {
    base: env.VITE_BASE_PATH || '/',
    envPrefix: 'VITE_',
    plugins: [
      react(),
      isAnalyze &&
        visualizer({
          filename: 'dist/stats.html',
          gzipSize: true,
          brotliSize: true,
          open: false,
        }),
    ].filter(Boolean),
    build: {
      target: 'es2018',
      minify: 'esbuild',
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 550,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('firebase')) return 'firebase'
              if (id.includes('react')) return 'react'
              if (id.includes('react-router')) return 'router'
              if (id.includes('lucide-react') || id.includes('react-hot-toast')) {
                return 'ui'
              }
              return 'vendor'
            }
          },
        },
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV || mode),
    },
  }
})
