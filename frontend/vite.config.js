import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], 
  // build: {
  //   manifest: true,
  //   rollupOptions: {
  //     input: './src/main.jsx'
  //   }
  // },
  // server: {
  //   proxy: {
  //     "/api": "http://localhost:4000/"
  //   }
  // }
})
