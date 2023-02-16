import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        hmr: false
    },
    base: '/CPAC-Ego/',
    plugins: [svelte(), glsl()]
})