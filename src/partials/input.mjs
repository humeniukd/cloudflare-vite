export const input = ({ id, label, name, value, error, autocomplete, placeholder, minlength, type, showHide }) => `<div>
    <label class="text-base/6 select-none sm:text-sm/6" for="${id}">${label}</label>
    <div class="mt-2">
      <span class="relative block w-full before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500">
          <input
            id="${id}"
            placeholder="${placeholder}"
            ${minlength ? ` minlength="${minlength}"` : ''}
            ${value ? ` value="${value}"` : ''}
            ${name ? ` name="${name}"` : ''}
            ${autocomplete ? ` autocomplete="${autocomplete}"` : ''}
            ${type ? ` type="${type}"` : ' type="text"'}
            required
               class="block w-full relative appearance-none rounded-md px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] bg-transparent dark:bg-white/5 focus:outline-hidden text-base/6 placeholder:text-zinc-500 sm:text-sm/6  border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20"/>
          ${showHide ? `
              <button id="show-hide" type="button" class="absolute inset-y-0 right-0 px-3 cursor-pointer text-zinc-600 dark:text-gray-200">
                <svg class="h-5 w-5 hidden" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l10.5 10.5a.75.75 0 1 0 1.06-1.06l-1.322-1.323a7.012 7.012 0 0 0 2.16-3.11.87.87 0 0 0 0-.567A7.003 7.003 0 0 0 4.82 3.76l-1.54-1.54Zm3.196 3.195 1.135 1.136A1.502 1.502 0 0 1 9.45 8.389l1.136 1.135a3 3 0 0 0-4.109-4.109Z" clip-rule="evenodd" />
                    <path d="m7.812 10.994 1.816 1.816A7.003 7.003 0 0 1 1.38 8.28a.87.87 0 0 1 0-.566 6.985 6.985 0 0 1 1.113-2.039l2.513 2.513a3 3 0 0 0 2.806 2.806Z" />
                </svg>
                <svg class="h-5 w-5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                    <path fill-rule="evenodd" d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd" />
                </svg>
            </button>
          ` : ''}
      </span>
    </div>
    ${error ? `<p class="pt-1 text-base/6 text-red-600 sm:text-sm/6 dark:text-red-500">${error}</p>` : ''}
</div>`