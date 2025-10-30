import makeTemplate from './partials/index.mjs';
import signup from './signup.mjs';

export default {
    async fetch(req: Request, env: Env): Promise<Response> {
        const url = new URL(req.url);
        const { origin, pathname } = url;
        if (pathname.match(/\.(js|css|svg|ico)$/gm)) // @ts-ignore
            return await env.ASSETS.fetch(url);
        const template = makeTemplate({ dark: false })
        return new Response(signup({ name: "name", email: "email", redirect: "/", error: '1', template }), {
            headers: new Headers({
                'Content-Type': 'text/html'
            })
        });
    }
};