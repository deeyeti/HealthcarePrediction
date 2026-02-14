import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        cardiovascular: 'cardiovascular.html',
        diabetes: 'diabetes.html',
        heartDisease: 'heart-disease.html',
        obesity: 'obesity.html'
      }
    }
  }
});
