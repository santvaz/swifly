/* empty css                        */
import { c as createAstro, d as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead } from '../astro_ogGt8jf6.mjs';
import 'kleur/colors';
import { $ as $$HeadDashboard, a as $$DashboardNav } from './dashboard_ClkIgrlq.mjs';
import { b as $$Icon } from './400_DChj4Xfz.mjs';
/* empty css                                    */

const $$Astro = createAstro("https://www.swifly.app");
const prerender = false;
const $$ProjectTemplate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProjectTemplate;
  const user = Astro2.locals.user;
  if (!user) {
    return Astro2.redirect("/");
  }
  return renderTemplate`<html lang="es" data-astro-cid-mbolmmjs> ${renderComponent($$result, "HeadDashboard", $$HeadDashboard, { "subtitle": "Mis proyectos", "data-astro-cid-mbolmmjs": true })}${maybeRenderHead()}<body class="bg-gray-100 flex flex-col justify-center items-center" data-astro-cid-mbolmmjs> ${renderComponent($$result, "DashboardNav", $$DashboardNav, { "data-astro-cid-mbolmmjs": true })} <div class="project-container flex flex-col justify-center items-center mt-24 rounded-xl bg-neutral-50 border border-gray-300 w-full max-w-7xl" data-astro-cid-mbolmmjs> <div class="project-wrapper flex flex-row justify-start m-12 items-end gap-2 w-full" data-astro-cid-mbolmmjs> <h2 class="ml-10" data-astro-cid-mbolmmjs>Título de proyecto</h2> <div class="project-edit cursor-pointer text-grape-900 text-opacity-75 hover:text-opacity-100" data-astro-cid-mbolmmjs> <div class="project-edit-popover flex flex-row gap-1 items-end justify-center" data-astro-cid-mbolmmjs> ${renderComponent($$result, "Icon", $$Icon, { "icon": "edit", "size": "0.9em", "data-astro-cid-mbolmmjs": true })} <div class="popover text-sm text-gray-400 font-semibold" data-astro-cid-mbolmmjs> ${renderComponent($$result, "WrappedPopover", null, { "title": "Editar", "client:only": "react", "client:component-hydration": "only", "data-astro-cid-mbolmmjs": true, "client:component-path": "C:/Users/Sandra/Desktop/layout/src/components/ui/WrappedPopover.tsx", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` <div class="flex flex-col items-center justify-start" data-astro-cid-mbolmmjs> <form action="post" class="rounded-lg w-full flex flex-col justify-center items-center text-grape-900 font-semibold" data-astro-cid-mbolmmjs> <label for="project-edit-title" data-astro-cid-mbolmmjs>Nombre de proyecto</label> <span class="text-gray-400 font-normal p-1 text-sm" data-astro-cid-mbolmmjs>Modifica el nombre de tu proyecto</span> <hr class="h-px w-full text-gray-400 my-3" data-astro-cid-mbolmmjs> <input type="text" name="project-edit-title" id="project-edit-title" class="w-full shadow-inner p-2 rounded-lg border border-grape-700 bg-plum-100 focus:bg-plum-200 outline-none focus:ring-1 focus:ring-grape-900 my-2" data-astro-cid-mbolmmjs> <input type="submit" value="Cambiar" class="w-full bg-grape-800 rounded-lg p-2 text-white cursor-pointer hover:bg-grape-900" data-astro-cid-mbolmmjs> </form> </div> ` })} </div> </div> </div> </div> </div> <div class="my-8 w-full max-w-7xl" data-astro-cid-mbolmmjs> ${renderComponent($$result, "Board", null, { "client:only": "react", "client:component-hydration": "only", "data-astro-cid-mbolmmjs": true, "client:component-path": "C:/Users/Sandra/Desktop/layout/src/components/ui/Board.tsx", "client:component-export": "default" })} </div>  </body> </html>`;
}, "C:/Users/Sandra/Desktop/layout/src/pages/projectTemplate.astro", void 0);

const $$file = "C:/Users/Sandra/Desktop/layout/src/pages/projectTemplate.astro";
const $$url = "/projectTemplate";

export { $$ProjectTemplate as default, $$file as file, prerender, $$url as url };
