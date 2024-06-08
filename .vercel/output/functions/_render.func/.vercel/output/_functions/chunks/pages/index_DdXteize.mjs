/* empty css                        */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, f as renderSlot, g as renderComponent } from '../astro_ogGt8jf6.mjs';
import 'kleur/colors';
import { b as $$Icon, $ as $$Hero, a as $$BaseLayout } from './400_DChj4Xfz.mjs';
import { $ as $$CallToAction, a as $$ContactCTA } from './about_T2Pzkymw.mjs';
import 'clsx';
/* empty css                          */

const $$Astro$1 = createAstro("https://www.swifly.app");
const $$Grid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Grid;
  const { variant } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<ul${addAttribute([
    "grid",
    { offset: variant === "offset", small: variant === "small" }
  ], "class:list")} data-astro-cid-vc5tsdmu> ${renderSlot($$result, $$slots["default"])} </ul> `;
}, "C:/Users/Sandra/Desktop/layout/src/components/Grid.astro", void 0);

const $$Skills = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="box skills" data-astro-cid-ab4ihpzs> <div class="stack gap-2 lg:gap-4" data-astro-cid-ab4ihpzs> ${renderComponent($$result, "Icon", $$Icon, { "icon": "unified", "color": "var(--accent-regular)", "size": "2.5rem", "gradient": true, "data-astro-cid-ab4ihpzs": true })} <h2 data-astro-cid-ab4ihpzs>Unificación</h2> <p data-astro-cid-ab4ihpzs>La aplicación para hacerlo todo. Unifica herramientas.</p> </div> <div class="stack gap-2 lg:gap-4" data-astro-cid-ab4ihpzs> ${renderComponent($$result, "Icon", $$Icon, { "icon": "info", "color": "var(--accent-regular)", "size": "2.5rem", "gradient": true, "data-astro-cid-ab4ihpzs": true })} <h2 data-astro-cid-ab4ihpzs>Control</h2> <p data-astro-cid-ab4ihpzs>
Ten el control en todo momento: mantén el orden de tu proyecto con un
      historial de cambios.
</p> </div> <div class="stack gap-2 lg:gap-4" data-astro-cid-ab4ihpzs> ${renderComponent($$result, "Icon", $$Icon, { "icon": "custom", "color": "var(--accent-regular)", "size": "2.5rem", "gradient": true, "data-astro-cid-ab4ihpzs": true })} <h2 data-astro-cid-ab4ihpzs>Personalización</h2> <p data-astro-cid-ab4ihpzs>
Todas las tareas añadidas se pueden arrastrar y soltar dentro de Swifly.
</p> </div> </section> `;
}, "C:/Users/Sandra/Desktop/layout/src/components/Skills.astro", void 0);

const $$Astro = createAstro("https://www.swifly.app");
const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const user = Astro2.locals.user;
  if (user) {
    return Astro2.redirect("/dashboard");
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="stack lg:gap-48" data-astro-cid-j7pv25f6> <div class="wrapper stack gap-8 lg:gap-20 mb-12" data-astro-cid-j7pv25f6> <header class="hero flex flex-col w-full items-center justify-center" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Hero", $$Hero, { "title": "Organiza, gestiona, colabora.", "tagline": "El espacio de trabajo todo en uno para ti y tu equipo.", "align": "start", "data-astro-cid-j7pv25f6": true })} <div class="cta" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "CallToAction", $$CallToAction, { "href": "/signup", "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate`Comienza ahora` })} </div> </header> ${renderComponent($$result2, "Skills", $$Skills, { "data-astro-cid-j7pv25f6": true })} </div> <main class="wrapper stack gap-20 lg:gap-48 mb-12" data-astro-cid-j7pv25f6> <section class="section grid gap-8 lg:gap-20" data-astro-cid-j7pv25f6> <header class="section-header justify-self-center text-center max-w-50ch text-md lg:text-lg text-gray-300" data-astro-cid-j7pv25f6> <h3 class="text-2xl lg:text-4xl mb-8" data-astro-cid-j7pv25f6>Características</h3> <p data-astro-cid-j7pv25f6>
Todos los puntos que hacen que Swifly destaque como aplicación de
            gestión de proyectos colaborativos.
</p> </header> <div class="gallery grid gap-8 lg:gap-20" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Grid", $$Grid, { "variant": "small", "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate`${[
    "Tus proyectos como unidad principal de trabajo",
    "Crea, edita y elimina a tu gusto desde el m\xF3dulo de administraci\xF3n",
    "Ten el control en todo momento con un historial de cambios en tu proyecto",
    "Puedes tener conversaciones a trav\xE9s de chats privados con otros usuarios",
    "Invita a otros usuarios a colaborar contigo"
  ].map((brand) => renderTemplate`<li class="mention-card flex justify-center items-center text-center border border-gray-800 rounded bg-gradient-subtle shadow-sm p-2 hover:opacity-80 cursor-pointer" data-astro-cid-j7pv25f6> <p data-astro-cid-j7pv25f6>${brand}</p> </li>`)}` })} </div> </section> <section class="section with-background" data-astro-cid-j7pv25f6> <header class="section-header stack gap-2 lg:gap-4" data-astro-cid-j7pv25f6> <h3 class="mb-12" data-astro-cid-j7pv25f6>Nuestra misión</h3> <p data-astro-cid-j7pv25f6>
En Swifly tenemos una pasión por construir una comunidad sana para
            todo el mundo. Podrás conectar con tus amigos, compañeros de trabajo
            y usuarios en una comunidad segura y hecha a medida.
</p> <div class="cta mt-12" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "CallToAction", $$CallToAction, { "href": "/about/", "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate`
Sobre Nosotros
${renderComponent($$result3, "Icon", $$Icon, { "icon": "arrow-right", "size": "1em", "data-astro-cid-j7pv25f6": true })} ` })} </div> </header> </section> ${renderComponent($$result2, "ContactCTA", $$ContactCTA, { "data-astro-cid-j7pv25f6": true })} </main> </div>  ` })}`;
}, "C:/Users/Sandra/Desktop/layout/src/pages/index.astro", void 0);

const $$file = "C:/Users/Sandra/Desktop/layout/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, prerender, $$url as url };
