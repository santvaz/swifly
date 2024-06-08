/* empty css                        */
import { d as createComponent, r as renderTemplate, m as maybeRenderHead, g as renderComponent } from '../astro_ogGt8jf6.mjs';
import 'kleur/colors';
import { b as $$Icon, $ as $$Hero, a as $$BaseLayout } from './400_DChj4Xfz.mjs';
/* empty css                          */

const $$Login$1 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="box input flex justify-center items-center h-fit rounded-none w-full max-w-lg" data-astro-cid-b2fdlob7> <div class="login-logo flex items-center justify-center p-2 bg-neutral-50 mb-4 border border-purple-500 border-opacity-50 rounded-full" data-astro-cid-b2fdlob7> ${renderComponent($$result, "Icon", $$Icon, { "icon": "swifly", "color": "var(--accent-regular)", "size": "2.5em", "gradient": true, "data-astro-cid-b2fdlob7": true })} </div> <div class="providers-sign-in flex flex-col divide-y divide-slate-500 divide-opacity-50" data-astro-cid-b2fdlob7> <!-- <div
      class="google-sign-in flex flex-row justify-center items-center gap-3 p-6 w-full border-t border-slate-500 border-opacity-50"
    >
      <div class="google-icon bg-white shadow-md rounded-full p-1">
        <Icon icon="google" size="1em" />
      </div>
      <SignIn provider="google" class="hover:text-slate-600"
        >Iniciar sesión con Google</SignIn
      >
    </div> --> <div class="github-sign-in border-y border-y-slate-500 border-opacity-50" data-astro-cid-b2fdlob7> <a href="/api/github" class="flex flex-row justify-center items-center gap-3 p-6 w-full hover:opacity-80" data-astro-cid-b2fdlob7> <div class="github-icon bg-white text-slate-900 shadow-md rounded-full p-1" data-astro-cid-b2fdlob7> ${renderComponent($$result, "Icon", $$Icon, { "icon": "github-logo", "size": "1.1em", "data-astro-cid-b2fdlob7": true })} </div>
Iniciar sesión con GitHub</a> <!-- <SignIn provider="github" class="hover:text-slate-600"
        >Iniciar sesión con GitHub</SignIn
      > --> </div> </div> <form method="POST" id="loginForm" action="/api/signin" class="flex flex-col justify-center gap-8 py-12 items-center w-full" data-astro-cid-b2fdlob7> <label for="username" class="text-xl" data-astro-cid-b2fdlob7>Usuario</label> <input type="text" name="username" id="username" class="bg-opacity-50 px-8 py-4 rounded-xl border border-x-[var(--gray-800)] border-y-[var(--gray-600)] focus:outline-none focus:border-purple-600 bg-[var(--gray-900)]" data-astro-cid-b2fdlob7> <span id="usernameError" class="error" data-astro-cid-b2fdlob7></span> <label for="password" class="text-xl" data-astro-cid-b2fdlob7>Clave</label> <input type="password" name="password" id="password" class="bg-opacity-50 px-8 py-4 rounded-xl border border-x-[var(--gray-800)] border-y-[var(--gray-600)] focus:outline-none focus:border-purple-600 bg-[var(--gray-900)]" data-astro-cid-b2fdlob7> <span id="passwordError" class="error" data-astro-cid-b2fdlob7></span> <input type="submit" class="shadow-xl" value="Iniciar sesión" id="login" data-astro-cid-b2fdlob7> <div class="utils text-sm flex flex-col items-center justify-center" data-astro-cid-b2fdlob7> <a href="/forgot" class="hover:opacity-80 m-2" data-astro-cid-b2fdlob7>He olvidado mi contraseña</a> <a href="/signup" class="hover:opacity-80 m-2" data-astro-cid-b2fdlob7>Quiero registrarme</a> </div> </form>   </section>`;
}, "C:/Users/Sandra/Desktop/layout/src/components/Login.astro", void 0);

const prerender = false;
const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Iniciar sesi\xF3n | Swifly", "description": "Inicia sesi\xF3n o reg\xEDstrate en Swifly" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="stack gap-20"> <main class="wrapper stack gap-8"> ${renderComponent($$result2, "Hero", $$Hero, { "title": "Inicia sesi\xF3n", "tagline": "O reg\xEDstrate si no tienes una cuenta", "align": "start" })} <div class="flex justify-center"> ${renderComponent($$result2, "LogBox", $$Login$1, {})} </div> </main> </div> ` })}`;
}, "C:/Users/Sandra/Desktop/layout/src/pages/login.astro", void 0);

const $$file = "C:/Users/Sandra/Desktop/layout/src/pages/login.astro";
const $$url = "/login";

export { $$Login as default, $$file as file, prerender, $$url as url };
