/* empty css                        */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, f as renderSlot, g as renderComponent } from '../astro_ogGt8jf6.mjs';
import 'kleur/colors';
import { b as $$Icon, $ as $$Hero, a as $$BaseLayout } from './400_DChj4Xfz.mjs';
import 'clsx';
/* empty css                          */
/* empty css                          */

const $$Astro = createAstro("https://www.swifly.app");
const $$CallToAction = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CallToAction;
  const { href } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")} data-astro-cid-balv45lp>${renderSlot($$result, $$slots["default"])}</a> `;
}, "C:/Users/Sandra/Desktop/layout/src/components/CallToAction.astro", void 0);

const $$ContactCTA = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<aside data-astro-cid-rcdzuq3a> <h2 data-astro-cid-rcdzuq3a>Hacer preguntas mejora nuestro aprendizaje.</h2> ${renderComponent($$result, "CallToAction", $$CallToAction, { "href": "/contact", "data-astro-cid-rcdzuq3a": true }, { "default": ($$result2) => renderTemplate`
Contáctanos
${renderComponent($$result2, "Icon", $$Icon, { "icon": "paper-plane-tilt", "size": "1em", "data-astro-cid-rcdzuq3a": true })} ` })} </aside> `;
}, "C:/Users/Sandra/Desktop/layout/src/components/ContactCTA.astro", void 0);

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "About | Swifly", "description": "Sobre Nosotros - Swifly", "data-astro-cid-kh7btl4r": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="stack gap-20" data-astro-cid-kh7btl4r> <main class="wrapper about" data-astro-cid-kh7btl4r> ${renderComponent($$result2, "Hero", $$Hero, { "title": "Sobre Nosotros", "tagline": "Estamos aqu\xED para hacerte todo m\xE1s f\xE1cil.", "data-astro-cid-kh7btl4r": true })} <section data-astro-cid-kh7btl4r> <h2 class="section-title" data-astro-cid-kh7btl4r>¿Quiénes somos?</h2> <div class="content" data-astro-cid-kh7btl4r> <p data-astro-cid-kh7btl4r>
Somos una plataforma virtual que se adapta a las necesidades del
            usuario. Nos enorgullece nuestra profunda comprensión en la
            importancia de trabajar en un entorno limpio y ordenado, así como
            nuestra determinación constante de estar a tu lado en cada momento
            que sea necesario.
</p> </div> </section> <section data-astro-cid-kh7btl4r> <h2 class="section-title" data-astro-cid-kh7btl4r>¿Por qué Swifly?</h2> <div class="content" data-astro-cid-kh7btl4r> <a href="/" data-astro-cid-kh7btl4r>Swifly</a> nace como una aplicación web que surge de la necesidad
          de organización diaria para las personas. Hemos unificado todas las herramientas
          posibles en un solo lugar, para que no tengas que depender de muchos recursos.
          Podrás invitar a tus amigos, colaborar en otros proyectos o simplemente
          cosecharlos por tu cuenta.
<div class="flex flex-col lg:flex-row justify-center items-center my-12" data-astro-cid-kh7btl4r> <img class="mx-4 border border-solid border-neutral-400 cursor-pointer hover:animate-pulse" src="https://images.unsplash.com/photo-1572177812156-58036aae439c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" width="200" height="200" data-astro-cid-kh7btl4r> <img class="mx-4 border border-solid border-neutral-400 cursor-pointer hover:animate-pulse" src="https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?q=80&w=2057&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" width="200" height="200" data-astro-cid-kh7btl4r> <img class="mx-4 border border-solid border-neutral-400 cursor-pointer hover:animate-pulse" src="https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" width="200" height="200" data-astro-cid-kh7btl4r> </div> </div> </section> <section data-astro-cid-kh7btl4r> <h2 class="section-title" data-astro-cid-kh7btl4r>Nuestro equipo</h2> <div class="content" data-astro-cid-kh7btl4r> <p data-astro-cid-kh7btl4r>
El miembro detrás del equipo es Sandra, una desarrolladora web con
            una gran motivación y capacidad de aprendizaje, capaz de crear y
            desarrollar conceptos que pretende que Swifly prospere en una gran
            comunidad de usuarios.
</p> </div> </section> </main> ${renderComponent($$result2, "ContactCTA", $$ContactCTA, { "data-astro-cid-kh7btl4r": true })} </div> ` })} `;
}, "C:/Users/Sandra/Desktop/layout/src/pages/about.astro", void 0);

const $$file = "C:/Users/Sandra/Desktop/layout/src/pages/about.astro";
const $$url = "/about";

const about = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$CallToAction as $, $$ContactCTA as a, about as b };
