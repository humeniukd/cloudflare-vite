import { defineConfig } from 'vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite'
import crypto from 'node:crypto';
import { resolve } from 'node:path';
import hb from 'vite-plugin-handlebars';
import { pageData } from './pageData';

const props = `
    css='',
    email='',
    name='',
    error='',
    redirect='',
    dark=false,
    nonce=''
`;

const cssEntry = "index.css";

function generateHash(data) {
    const hash = crypto.createHash('SHAKE256', { outputLength: 4 })
    hash.update(data);
    return hash.digest('hex');
}

function handlebars(options) {
    const { transformIndexHtml, ...rest } = hb(options);
    return {
        ...rest,
        async transform(src, id) {
            if (/\.hbs$/.test(id)) {

                let html = await transformIndexHtml.handler(src, { path: id });
                if (process.env.NODE_ENV === "production") {
                    const hash = process.env.CSS = generateHash(html);
                    html = html.replace(cssEntry, `${hash}.css`);
                }
                return `export const template = ({${props}}) => \`${html}\``;
            }
        },
    }
}

export default defineConfig({
    plugins: [
        cloudflare(),
        handlebars({
            context: pagePath => pageData[pagePath.split('/').pop()],
            partialDirectory: resolve(__dirname, 'src/partials'),
        }),
        tailwindcss()
    ],
    build: {
        rollupOptions: {
            input: cssEntry,
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.names.some(n => n === cssEntry))
                        return process.env.CSS + ".css";
                    return null;
                },
            },
        },
    }
});