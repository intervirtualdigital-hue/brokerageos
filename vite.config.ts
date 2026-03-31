import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: '/',
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-utils': ['lucide-react', 'clsx', 'tailwind-merge', 'date-fns'],
            'vendor-ui': ['framer-motion', 'recharts', 'sonner'],
            'vendor-dnd': ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
          },
        },
      },
    },
    server: {
      proxy: {
        '/api/ghl': {
          target: 'https://services.leadconnectorhq.com',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/ghl/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (env.VITE_GHL_API_KEY) {
                proxyReq.setHeader('Authorization', `Bearer ${env.VITE_GHL_API_KEY}`)
              }
            })
          },
        },
      },
    },
  }
})
