import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 8000,
  },

  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 将 @ 别名指向 src 目录
    },
  },
  css: {
    modules: {
      // 配置 CSS Modules
      localsConvention: 'camelCase', // 使用驼峰命名
    },
  },
});
