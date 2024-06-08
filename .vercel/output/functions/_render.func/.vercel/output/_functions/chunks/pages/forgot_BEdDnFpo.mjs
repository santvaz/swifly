/* empty css                        */
import { d as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead } from '../astro_ogGt8jf6.mjs';
import 'kleur/colors';
import { $ as $$Hero, b as $$Icon, a as $$BaseLayout } from './400_DChj4Xfz.mjs';
/* empty css                           */

const prerender = false;
const $$Forgot = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Restablecer cuenta | Swifly", "description": "Pasos para recuperar mi cuenta", "data-astro-cid-7lekx24n": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="stack gap-20" data-astro-cid-7lekx24n> <main class="wrapper stack gap-8" data-astro-cid-7lekx24n> ${renderComponent($$result2, "Hero", $$Hero, { "title": "\xBFHas olvidado tu contrase\xF1a?", "tagline": "Sigue estos pasos para recuperarla", "align": "start", "data-astro-cid-7lekx24n": true })} <div class="flex justify-center" data-astro-cid-7lekx24n> <section class="box input flex justify-center items-center h-fit rounded-none w-full max-w-lg" data-astro-cid-7lekx24n> <div class="login-logo flex items-center justify-center p-2 bg-neutral-50 mb-4 border border-purple-500 border-opacity-50 rounded-full" data-astro-cid-7lekx24n> ${renderComponent($$result2, "Icon", $$Icon, { "icon": "swifly", "color": "var(--accent-regular)", "size": "2.5em", "gradient": true, "data-astro-cid-7lekx24n": true })} </div> <form method="POST" id="passwordReset" action="/api/password-reset" class="flex flex-col justify-center gap-8 py-12 items-center w-full" data-astro-cid-7lekx24n> <label for="email" class="text-xl" data-astro-cid-7lekx24n>E-mail</label> <input type="email" name="email" id="email" class="bg-opacity-50 px-8 py-4 rounded-xl border border-x-[var(--gray-800)] border-y-[var(--gray-600)] focus:outline-none focus:border-purple-600 bg-[var(--gray-900)]" data-astro-cid-7lekx24n> <span id="emailError" class="error" data-astro-cid-7lekx24n></span> <input type="submit" class="shadow-xl" value="Restablecer cuenta" id="reset" data-astro-cid-7lekx24n> <div class="utils text-sm flex flex-col items-center justify-center" data-astro-cid-7lekx24n> <a href="/login" class="hover:opacity-80 m-2" data-astro-cid-7lekx24n>Quiero iniciar sesión</a> <a href="/signup" class="hover:opacity-80 m-2" data-astro-cid-7lekx24n>Quiero registrarme</a> </div> </form> </section> </div> </main> </div> ` })}  `;
}, "C:/Users/Sandra/Desktop/layout/src/pages/forgot.astro", void 0);

const $$file = "C:/Users/Sandra/Desktop/layout/src/pages/forgot.astro";
const $$url = "/forgot";

export { $$Forgot as default, $$file as file, prerender, $$url as url };
