import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    root: "src/",
    build: {
        rollupOptions: {
            input: {
                main: resolve("src/index.html"),
                game: resolve("src/game/index.html")
            }
        },
        outDir: resolve("dist")
    }
})
