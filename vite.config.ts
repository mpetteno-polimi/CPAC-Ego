import * as fs from 'fs';
import * as path from 'path';
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        hmr: false
    },
    base: '/CPAC-Ego/',
    plugins: [svelte(), glsl(), mediapipe_workaround()]
})

// https://github.com/google/mediapipe/issues/2883
function mediapipe_workaround() {
    return {
        name: "mediapipe_workaround",
        load(id) {
            if (path.basename(id) === "face_mesh.js") {
                let code = fs.readFileSync(id, "utf-8")
                code += "exports.FaceMesh = FaceMesh;"
                return { code }
            } else {
                return null
            }
        }
    }
}