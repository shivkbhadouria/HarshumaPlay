import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'game_tictactoe',
      filename: 'remoteEntry.js',
      // Expose the components
      exposes: {
        './App': './src/App.jsx', 
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
     outDir: 'dist/assets'
  },
  // Run the remote game on local port 5001
  server: {
    port: 5001,
    strictPort: true
  },
  preview: {
    port: 5001,
    strictPort: true,
    cors: true
  }
})
