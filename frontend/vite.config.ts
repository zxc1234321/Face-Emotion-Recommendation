import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // vite.config.js
  server: {
    proxy: {
      '/webcam': {
        target: 'http://localhost:3000',  // 백엔드 서버 주소 및 포트
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/webcam/, '')
      },
    },
  },
})
