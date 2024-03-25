import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    resolve: {
        alias: [{ find: '@', replacement: '/src' }],
    },
    server: {
        watch: {
            usePolling: true
        },
        host: true,
        port: 3005
    },
    preview: {
        port: 3001
    },
    define: {
        __API__: JSON.stringify('https://neobook.online/mobi-market')
    }
})
