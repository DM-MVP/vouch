import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
// import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    // basicSsl(),
    svelte()
  ],
  server: {
    port: 80,
    strictPort: true,
    host: true,
    cors: true
  },
})
