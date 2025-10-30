import { defineConfig } from 'vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    environments: {
        client: {
            build: {
                rollupOptions: {
                    input: ['index.css', 'client.ts'],
                    output: {
                        entryFileNames: `[name].js`,
                        chunkFileNames: `[name].js`,
                        assetFileNames: `[name].[ext]`
                    }
                }
            }
        }
    },
    plugins: [
        cloudflare(),
        tailwindcss()
    ]
});