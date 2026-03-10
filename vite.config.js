import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or your specific plugin

export default defineConfig({
  base: '/Vehicle-Management-System/',
  plugins: [react()],
})
