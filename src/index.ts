// @ts-ignore
import { template } from './signup.hbs';

export default {
    async fetch(req: Request, env: Env): Promise<Response> {
        const url = new URL(req.url);
        const { pathname } = url;
        if (pathname.match(/\.(js|css|svg|ico)$/gm)) // @ts-ignore
            return env.ASSETS.fetch(req);
        return new Response(template({}), {
            headers: new Headers({
                'Content-Type': 'text/html'
            })
        });
    }
};