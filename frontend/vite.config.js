import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // เพื่อให้เข้าถึงจากภายนอก
    port: 4173,       // เปลี่ยนพอร์ตให้ตรงกับการ expose ใน Dockerfile
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  }
})
