import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host_dashboard',
      // Map the URLs of the remote games
      remotes: {
        game_tictactoe: 'http://localhost:5001/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom']
    })
  ],
  // Run the host app on local port 5000
  server: {
    port: 5000,
    strictPort: true
  },
  preview: {
    port: 5000,
    strictPort: true
  }
})
