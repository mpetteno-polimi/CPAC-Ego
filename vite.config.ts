import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import glsl from 'vite-plugin-glsl';
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        https: true,
        hmr: {
            host: "localhost",
            port: 3001,
            protocol: "wss",
        }
    },
    base: '/CPAC-Project/',
    plugins: [svelte(), glsl(), basicSsl()],
})