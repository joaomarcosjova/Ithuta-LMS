import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'icons/icon-192x192.png', 'icons/icon-512x512.png'],
      manifest: {
        name: 'Ithuta',
        short_name: 'Ithuta',
        description: 'Aprenda, conecte-se e encontre empregos',
        theme_color: '#1e40af',
        background_color: '#fff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            "src": "/icons/apple-touch-icon.png",
            "type": "image/png",
            "sizes": "180x180"
          }
        ]
      }
    })
  ],
  assetsInclude: ['**/*.JPG'],
  server: {
    host: true,
    port: 5173,
    hmr: {
      overlay: false,
    },
  },
})
