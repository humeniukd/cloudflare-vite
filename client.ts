const themes = [false, true];

const image = document.getElementById("image") as HTMLInputElement;
const preview = document.getElementById("preview") as HTMLImageElement;
const file = document.getElementById("file")  as HTMLInputElement;

document.documentElement.classList.toggle("dark", (localStorage.dark && JSON.parse(localStorage.dark)) ?? window.matchMedia("(prefers-color-scheme:dark)").matches);

function handleEvent<T extends HTMLElement>(e: string | HTMLElement , event: string, cb: (e: T) => void) {
    const el = typeof e === "string" ? document.getElementById(e) : e;
    el?.addEventListener(event, (e: Event) => cb(e.currentTarget as T));
}

handleEvent('theme-switch', 'click', function switchTheme() {
    const raw = localStorage.dark;
    let currentVal = raw && JSON.parse(raw);
    const idx = themes.indexOf(currentVal);
    const isDark = themes[idx + 1 % themes.length];
    if (isDark !== undefined) {
        localStorage.dark = isDark;
    } else
        localStorage.removeItem('dark');
    const newVal = isDark ?? window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", newVal);
});

function togglePassword() {
    const inputs = document.querySelectorAll<HTMLInputElement>('[id*="password"]');
    for (const i of inputs)
        i.type = i.type === 'text' ? 'password' : 'text';
}

handleEvent('show-hide', 'click', (e) => {
    for (const c of e.children)
        c.classList.toggle('hidden');
    togglePassword();
});

handleEvent('password', 'input', function pwd(e: HTMLInputElement) {
    e.setCustomValidity('');
    if (!e.checkValidity()) return;
    if (!e.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/g)) {
        e.setCustomValidity("Password must consist of numbers, lower and upper case letters");
    }
})
handleEvent('confirm-password', 'input', function (e: HTMLInputElement) {
    e.setCustomValidity('');
    if (!e.checkValidity()) return;
    // @ts-ignore
    if (e.value !== e.form?.elements['password'].value) {
        e.setCustomValidity("Passwords don't match");
    }
});

handleEvent(preview, 'click', (e: HTMLElement) => {
    image.value = file.value = '';
    e.classList.toggle("hidden");
});

handleEvent(file, 'change', (e: HTMLInputElement) => {
    if (!e.files?.length) return;
    const reader = new FileReader();
    reader.readAsDataURL(e.files[0]);
    reader.onload = f => {
        const i: HTMLImageElement = document.createElement('img');
        i.onload = e => {
            const img = e.target as HTMLImageElement;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            ctx.canvas.width = ctx.canvas.height = 150;
            const imgSize = Math.min(img.width, img.height);
            const left = (img.width - imgSize) / 2;
            const top = (img.height - imgSize) / 2;
            ctx.drawImage(img, left, top, imgSize, imgSize, 0, 0, ctx.canvas.width, ctx.canvas.height);
            preview.src = image.value = canvas.toDataURL('image/png');
            preview.classList.toggle("hidden")
        };
        i.src = f.target?.result as string;
    }
})