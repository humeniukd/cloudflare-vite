import header from './header.html?raw';
import footer from './footer.html?raw';
export *  from './button';
export * from './input';
export * from './oauth';

export default function makeTemplate({ dark }) {
 return (title, content) => `
  <!doctype html>
    <html class="antialiased bg-white dark:bg-zinc-900" lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <link rel="shortcut icon" href="favicon.ico" />
        <link href="/index.css" rel="stylesheet">
    </head>
    <body class="flex antialiased min-h-screen flex-col justify-between">
    ${header}
    <div class="sm:px-6 lg:px-8 lg:pb-32 xl:pb-36">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                ${title}
            </h2>
        </div>
        <div class="mt-6 mx-auto w-full max-w-[480px]">
            <div class="px-6 py-12 sm:rounded-lg sm:px-12 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-100 dark:ring-zinc-800">
                ${content}
            </div>
        </div>
    </div>
    ${footer}
    <script>
        if (${dark} !== undefined) localStorage.dark = ${dark};
    </script>
    <script type="module" src="/client.js"></script>
    </body>
  </html>
`}