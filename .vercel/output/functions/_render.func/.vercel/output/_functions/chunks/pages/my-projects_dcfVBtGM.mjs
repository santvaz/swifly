/* empty css                        */
import { c as createAstro, d as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead, e as addAttribute, l as Fragment } from '../astro_ogGt8jf6.mjs';
import 'kleur/colors';
import { $ as $$HeadDashboard, a as $$DashboardNav, B as BreadcrumbItem, b as BreadcrumbLink, W as WrappedBreadcrumb, c as $$FooterDashboard } from './dashboard_ClkIgrlq.mjs';
import { b as $$Icon } from './400_DChj4Xfz.mjs';

const getProjectListByUserId = async (userId) => {
  const response = await fetch(`www.swifly.app/api/project-list/${userId}`);
  const data = await response.json();
  return data;
};

const $$Astro = createAstro("https://www.swifly.app");
const prerender = false;
const $$MyProjects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MyProjects;
  const user = Astro2.locals.user;
  if (!user) {
    return Astro2.redirect("/");
  }
  const projects = await getProjectListByUserId(user.id);
  const username = user.username;
  return renderTemplate`<html lang="es"> <!-- head --> ${renderComponent($$result, "HeadDashboard", $$HeadDashboard, { "subtitle": `Proyectos de ${username}` })}${maybeRenderHead()}<body class="bg-gray-100 flex flex-col items-center justify-center gap-4"> ${renderComponent($$result, "DashboardNav", $$DashboardNav, {})} <div class="breadcrumbs p-8 md:p-0 w-full flex flex-col gap-4 justify-center items-center max-w-7xl"> ${renderComponent($$result, "WrappedBreadcrumb", WrappedBreadcrumb, { "href": "/", "name": "Dashboard" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "BreadcrumbItem", BreadcrumbItem, {}, { "default": ($$result3) => renderTemplate` <div class="active"> ${renderComponent($$result3, "BreadcrumbLink", BreadcrumbLink, { "href": "/my-projects" }, { "default": ($$result4) => renderTemplate`Mis proyectos` })} </div> ` })} ` })} </div> <main class="flex flex-col gap-2 justify-start items-start bg-white-200 p-10 rounded-lg bg-white border border-gray-300 shadow-sm w-full h-screen max-w-7xl"> <h2 class="text-grape-800 font-semibold text-2xl not-sr-only">
Mis proyectos
</h2> <hr class="h-px w-full text-gray-400 my-4"> <section class="my-projects flex flex-row justify-center items-start sm:justify-start flex-wrap basis-1/3 gap-5"> ${projects.length === 0 ? renderTemplate`<p class="text-sm">No se ha encontrado ningún proyecto</p>` : projects.map((project) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <a${addAttribute(`/projects/${project.id}`, "href")}> <div class="relative project rounded-md h-36 w-64 border border-plum-300 shadow-xs flex flex-col items-center justify-start cursor-pointer bg-plum-100 hover:animate-pulse-once shadow-md p-2 text-plum-700 "> <h5 class="font-semibold p-2">${project.title}</h5> <div class="px-8 py-2 w-full max-w-fit h rounded-lg text-xs text-center text-ellipsis truncate"> <span class="font-semibold">${project.description}</span> </div> <span class="text-xs py-2 absolute bottom-0 bg-plum-200 w-full text-center flex items-center justify-between px-1"> <span class="px-2">Ver más</span> ${renderComponent($$result2, "Icon", $$Icon, { "icon": "right", "size": "1.5em" })} </span> </div> </a> ` })}`)} </section> </main> ${renderComponent($$result, "FooterDashboard", $$FooterDashboard, {})} </body></html>`;
}, "C:/Users/Sandra/Desktop/layout/src/pages/my-projects.astro", void 0);

const $$file = "C:/Users/Sandra/Desktop/layout/src/pages/my-projects.astro";
const $$url = "/my-projects";

export { $$MyProjects as default, $$file as file, prerender, $$url as url };
