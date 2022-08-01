import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from "vite-plugin-pwa"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
          cleanupOutdatedCaches: false,
          sourcemap: true,
          globPatterns: [
              "**/*.{woff2,ttf,eot,woff,svg,css,js,jpg,ico,png,webp,html,json,txt}",
          ],
      },
      manifest: {
          name: "streaming-list",
          short_name: "streaming-list",
          display: "standalone",
          theme_color: "#343a40",
          background_color: "#343a40",
          icons: [],
      }})
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: "127.0.0.1",
    port: 3000
  }
})
