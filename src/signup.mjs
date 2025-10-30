import { oauth, button, input } from './partials';

export default ({ name, email, error, redirect, template }) => template('Sign up with a new account', `
<form class="space-y-5" action="/signup" method="POST">
    ${input({id: 'name', name: 'name', placeholder: 'Full name', minlength: 5, value: name, autocomplete: 'name', label:'Your name'})}
    ${input({id: 'email', name: 'email', placeholder: "Email address", type: 'email', value: email, autocomplete: 'email', label: 'Email address'})}
    ${input({id: 'password', name: 'password', placeholder: "Password", type: 'password', minlength: 8, autocomplete: 'new-password', label: 'Password', showHide: true})}
    ${input({id: 'confirm-password', placeholder: "Confirm password", type: 'password', minlength: 8, autocomplete: 'new-password', label: 'Confirm password'})}
  <div>
    <label class="text-base/6 select-none sm:text-sm/6" for="file">
      Profile Image (optional)
    </label>
    <div class="mt-2 flex items-end gap-4">
      <span class="relative block w-full before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500">
        <input id="file" class="block w-full relative appearance-none rounded-md px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] file:text-zinc-500 bg-transparent dark:bg-white/5  focus:outline-hidden text-base/6 placeholder:text-zinc-500 sm:text-sm/6 border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20" accept="image/*" type="file" />
        <input id="image" type="hidden" name="image" />
        <span class="absolute inset-y-0 right-2 aspect-square rounded-full m-1 overflow-hidden">
          <img id="preview" alt="Profile image" class="object-cover w-full h-full cursor-pointer hidden" src="" />
        </span>
      </span>
    </div>
    ${error ? `<p class="pt-2 text-base/6 text-red-600 sm:text-sm/6 dark:text-red-500">${error}</p>` : ''}
  </div>
  ${button('Sign up')}
</form>
<p class="pt-2 text-gray-700 text-sm dark:text-gray-300">
  <span >Have an account?</span>
  <a href="/signin" class="float-right cursor-pointer hover:text-black hover:dark:text-white" type="submit">Sign in</a>
</p>
${oauth(redirect)}
`)