import { defineConfig } from 'vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite'
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

function handlebars(options) {
    const { transformIndexHtml, ...rest } = hb(options);
    return {
        ...rest,
        async transform(src, id) {
            if (/\.hbs$/.test(id)) {
                const html = await transformIndexHtml.handler(src, { path: id })
                return `export const template = ({${props}}) => \`${html}\``;
            }
        },
    }
}

export default defineConfig({
    plugins: [
        handlebars({
            context: pagePath => pageData[pagePath.split('/').pop()],
            partialDirectory: resolve(__dirname, 'src/partials'),
        }),
        tailwindcss(),
        cloudflare()
    ],
});