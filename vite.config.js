import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000
  },
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate' ,
      injectRegister: true,
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Kabo ',
        short_name: 'Kabo',
        description: 'Kabo mobile food delivery service fo Kabo Stores',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/assets/logo192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/assets/logo512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
      },
      workbox: {
        globDirectory: 'dist',
        globPatterns: ['**/*'],
        swDest: 'dist/sw.js',
        additionalManifestEntries: [
          { url: 'index.html', revision: null } // Precache index.html without revisioning
        ]
      },
      pwa: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 // Set the limit to 5MB (or adjust as needed)
      }
    })
  ],
})
