import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/portfolio/", // 👈 앞뒤에 / 가 있는지 꼭 확인!
})