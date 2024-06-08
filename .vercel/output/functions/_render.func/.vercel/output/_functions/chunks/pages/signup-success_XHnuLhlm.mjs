/* empty css                        */
import { d as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead, f as renderSlot } from '../astro_ogGt8jf6.mjs';
import 'kleur/colors';
import { $ as $$Hero, a as $$BaseLayout } from './400_DChj4Xfz.mjs';
/* empty css                                   */

const $$MessageInfo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Info | Swifly", "description": "Mensaje informativo de Swifly para el usuario", "data-astro-cid-bnkyvhul": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="stack gap-20" data-astro-cid-bnkyvhul> <main class="wrapper stack gap-8" data-astro-cid-bnkyvhul> ${renderComponent($$result2, "Hero", $$Hero, { "title": "", "tagline": "", "data-astro-cid-bnkyvhul": true })} <div class="flex justify-center" data-astro-cid-bnkyvhul> <section class="box input flex justify-center items-center h-fit rounded-none w-full max-w-lg" data-astro-cid-bnkyvhul> <div class="flex flex-col gap-12 justify-center items-start rounded-lg w-full" data-astro-cid-bnkyvhul> ${renderSlot($$result2, $$slots["default"])} <div class="w-full flex flex-row justify-center items-center gap-8" data-astro-cid-bnkyvhul> <a href="/signup" class="bg-gray-900 bg-opacity-70 border-y border-y-gray-700 border-x border-x-gray-500 text-neutral-100 p-2 rounded-lg hover:bg-opacity-80" data-astro-cid-bnkyvhul>Volver atrás</a> <a href="/" class="bg-teal-900 bg-opacity-70 border-y border-y-teal-700 border-x border-x-teal-500 text-neutral-100 p-2 rounded-lg hover:bg-opacity-80" data-astro-cid-bnkyvhul>Volver a inicio</a> <a href="/login" class="bg-violet-900 bg-opacity-70 border-y border-y-violet-700 border-x border-x-violet-500 text-neutral-100 p-2 rounded-lg hover:bg-opacity-80" data-astro-cid-bnkyvhul>Iniciar sesión</a> </div> </div> </section> </div> </main>  </div>` })}`;
}, "C:/Users/Sandra/Desktop/layout/src/components/MessageInfo.astro", void 0);

const $$SignupSuccess = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MessageInfo", $$MessageInfo, { "data-astro-cid-fb472ujb": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full flex items-center justify-center flex-col" data-astro-cid-fb472ujb> <strong data-astro-cid-fb472ujb>🙌 ¡Te has registrado correctamente! </strong> <p data-astro-cid-fb472ujb>
Te damos una cálida bienvenida a Swifly.
<br data-astro-cid-fb472ujb>
¡Sé libre de mandarnos un mensaje para todo aquello que necesites y estaremos
      dispuesto a ayudarte!
</p> <p data-astro-cid-fb472ujb>
Recuerda que puedes contactar con nosotros siempre que lo necesites a
      través del siguiente <a href="/contact" data-astro-cid-fb472ujb>enlace</a>.
</p> </div> ` })} `;
}, "C:/Users/Sandra/Desktop/layout/src/pages/signup-success.astro", void 0);

const $$file = "C:/Users/Sandra/Desktop/layout/src/pages/signup-success.astro";
const $$url = "/signup-success";

export { $$SignupSuccess as default, $$file as file, $$url as url };
