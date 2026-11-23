// Vite es el programa que ejecuta el proyecto mientras lo desarrollo.
// Aquí se le agrega el plugin de React para que entienda los archivos .jsx
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});