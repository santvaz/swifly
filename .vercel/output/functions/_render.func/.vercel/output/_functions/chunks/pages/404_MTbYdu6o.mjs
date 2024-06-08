/* empty css                        */
import { d as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead } from '../astro_ogGt8jf6.mjs';
import 'kleur/colors';
import { $ as $$Hero, a as $$BaseLayout } from './400_DChj4Xfz.mjs';
/* empty css                        */

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "P\xE1gina no encontrada", "description": "Error 404 \u2014 no se ha encontrado esta p\xE1gina", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "title": "P\xE1gina no encontrada", "tagline": "Parece que te has equivocado. Vuelve a la p\xE1gina de inicio para intentarlo de nuevo.", "data-astro-cid-zetdm5md": true })} ${maybeRenderHead()}<a href="/" data-astro-cid-zetdm5md>Volver a inicio</a> ` })} `;
}, "C:/Users/Sandra/Desktop/layout/src/pages/404.astro", void 0);

const $$file = "C:/Users/Sandra/Desktop/layout/src/pages/404.astro";
const $$url = "/404";

export { $$404 as default, $$file as file, $$url as url };
