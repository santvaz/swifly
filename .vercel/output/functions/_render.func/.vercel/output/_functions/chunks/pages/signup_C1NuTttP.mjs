/* empty css                        */
import { d as createComponent, r as renderTemplate, m as maybeRenderHead, g as renderComponent } from '../astro_ogGt8jf6.mjs';
import 'kleur/colors';
import { b as $$Icon, $ as $$Hero, a as $$BaseLayout } from './400_DChj4Xfz.mjs';
/* empty css                           */

const $$SignUp = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="box input flex justify-center items-center h-fit rounded-none w-full max-w-lg" data-astro-cid-vm2atzme> <div class="signup-logo flex items-center justify-center p-2 bg-neutral-50 mb-4 border border-purple-500 border-opacity-50 rounded-full" data-astro-cid-vm2atzme> ${renderComponent($$result, "Icon", $$Icon, { "icon": "swifly", "color": "var(--accent-regular)", "size": "2.5em", "gradient": true, "data-astro-cid-vm2atzme": true })} </div> <form method="POST" action="/api/signup" id="signupForm" class="flex flex-col justify-center gap-8 py-12 items-center w-full" data-astro-cid-vm2atzme> <label for="email" class="text-xl" data-astro-cid-vm2atzme>E-mail</label> <input type="text" name="email" id="email" class="bg-opacity-50 px-8 py-4 rounded-xl border border-x-[var(--gray-800)] border-y-[var(--gray-600)] focus:outline-none focus:border-purple-600 bg-[var(--gray-900)]" data-astro-cid-vm2atzme> <span id="emailError" class="error" data-astro-cid-vm2atzme></span> <label for="username" class="text-xl" data-astro-cid-vm2atzme>Usuario</label> <input type="text" name="username" id="username" class="bg-opacity-50 px-8 py-4 rounded-xl border border-x-[var(--gray-800)] border-y-[var(--gray-600)] focus:outline-none focus:border-purple-600 bg-[var(--gray-900)]" data-astro-cid-vm2atzme> <span id="usernameError" class="error" data-astro-cid-vm2atzme></span> <label for="password" class="text-xl" data-astro-cid-vm2atzme>Clave</label> <input type="password" name="password" id="password" class="bg-opacity-50 px-8 py-4 rounded-xl border border-x-[var(--gray-800)] border-y-[var(--gray-600)] focus:outline-none focus:border-purple-600 bg-[var(--gray-900)]" data-astro-cid-vm2atzme> <span id="passwordError" class="error" data-astro-cid-vm2atzme></span> <div class="utils text-sm flex flex-col items-center justify-center" data-astro-cid-vm2atzme> <a href="/login" class="hover:opacity-80 m-2" data-astro-cid-vm2atzme>Quiero iniciar sesión</a> <a href="/forgot" class="hover:opacity-80 m-2" data-astro-cid-vm2atzme>He olvidado mi contraseña</a> </div> <input type="submit" class="shadow-xl" value="Registrarse" id="signup" data-astro-cid-vm2atzme> </form>   </section>`;
}, "C:/Users/Sandra/Desktop/layout/src/components/SignUp.astro", void 0);

const prerender = false;
const $$Signup = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Registro | Swifly", "description": "Crea una nueva cuenta de usuario en Swifly" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="stack gap-20"> <main class="wrapper stack gap-8"> ${renderComponent($$result2, "Hero", $$Hero, { "title": "Reg\xEDstrate", "tagline": "O inicia sesi\xF3n ahora si ya tienes una cuenta", "align": "start" })} <div class="flex justify-center"> ${renderComponent($$result2, "SignUpBox", $$SignUp, {})} <a href="../components/ui/"></a> </div> </main> </div> ` })}`;
}, "C:/Users/Sandra/Desktop/layout/src/pages/signup.astro", void 0);

const $$file = "C:/Users/Sandra/Desktop/layout/src/pages/signup.astro";
const $$url = "/signup";

export { $$Signup as default, $$file as file, prerender, $$url as url };
