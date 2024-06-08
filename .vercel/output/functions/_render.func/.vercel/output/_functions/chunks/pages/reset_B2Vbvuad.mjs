/* empty css                        */
import { d as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead } from '../astro_ogGt8jf6.mjs';
import 'kleur/colors';
import { $ as $$Hero, b as $$Icon, a as $$BaseLayout } from './400_DChj4Xfz.mjs';
/* empty css                          */

const prerender = false;
const $$Reset = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Restablecer contrase\xF1a | Swifly", "description": "Formulario para restablecer la contrase\xF1a", "data-astro-cid-qllierwk": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="stack gap-20" data-astro-cid-qllierwk> <main class="wrapper stack gap-8" data-astro-cid-qllierwk> ${renderComponent($$result2, "Hero", $$Hero, { "title": "Restablecer contrase\xF1a", "tagline": "", "align": "start", "data-astro-cid-qllierwk": true })} <div class="flex justify-center" data-astro-cid-qllierwk> <section class="box input flex justify-center items-center h-fit rounded-none w-full max-w-lg" data-astro-cid-qllierwk> <div class="login-logo flex items-center justify-center p-2 bg-neutral-50 mb-4 border border-purple-500 border-opacity-50 rounded-full" data-astro-cid-qllierwk> ${renderComponent($$result2, "Icon", $$Icon, { "icon": "swifly", "color": "var(--accent-regular)", "size": "2.5em", "gradient": true, "data-astro-cid-qllierwk": true })} </div> <form method="POST" id="confirmReset" action="/api/reset" class="flex flex-col justify-center gap-8 py-12 items-center w-full" data-astro-cid-qllierwk> <label for="newPassword" class="text-xl" data-astro-cid-qllierwk>Nueva contraseña</label> <input type="password" name="newPassword" id="newPassword" class="bg-opacity-50 px-8 py-4 rounded-xl border border-x-[var(--gray-800)] border-y-[var(--gray-600)] focus:outline-none focus:border-purple-600 bg-[var(--gray-900)]" data-astro-cid-qllierwk> <span id="newPasswordError" class="error" data-astro-cid-qllierwk></span> <label for="confirmNewPassword" class="text-xl" data-astro-cid-qllierwk>Confirmar nueva contraseña</label> <input type="password" name="confirmNewPassword" id="confirmNewPassword" class="bg-opacity-50 px-8 py-4 rounded-xl border border-x-[var(--gray-800)] border-y-[var(--gray-600)] focus:outline-none focus:border-purple-600 bg-[var(--gray-900)]" data-astro-cid-qllierwk> <span id="confirmNewPasswordError" class="error" data-astro-cid-qllierwk></span> <input type="submit" class="shadow-xl" value="Cambiar contraseña" id="reset" data-astro-cid-qllierwk> </form> </section> </div> </main> </div> ` })}  `;
}, "C:/Users/Sandra/Desktop/layout/src/pages/reset.astro", void 0);

const $$file = "C:/Users/Sandra/Desktop/layout/src/pages/reset.astro";
const $$url = "/reset";

export { $$Reset as default, $$file as file, prerender, $$url as url };
