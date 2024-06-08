/* empty css                        */
import { c as createAstro, d as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead } from '../astro_ogGt8jf6.mjs';
import 'kleur/colors';
import { $ as $$HeadDashboard, a as $$DashboardNav, B as BreadcrumbItem, b as BreadcrumbLink, W as WrappedBreadcrumb, c as $$FooterDashboard } from './dashboard_ClkIgrlq.mjs';
import { b as $$Icon } from './400_DChj4Xfz.mjs';
/* empty css                             */

const $$Astro = createAstro("https://www.swifly.app");
const prerender = false;
const $$Settings = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Settings;
  const user = Astro2.locals.user;
  if (!user) {
    return Astro2.redirect("/");
  }
  return renderTemplate`<html lang="es" data-astro-cid-swhfej32> ${renderComponent($$result, "HeadDashboard", $$HeadDashboard, { "subtitle": "Configuraci\xF3n", "data-astro-cid-swhfej32": true })}${maybeRenderHead()}<body class="bg-gray-100 flex flex-col justify-center items-center" data-astro-cid-swhfej32> ${renderComponent($$result, "DashboardNav", $$DashboardNav, { "data-astro-cid-swhfej32": true })} <div class="breadcrumbs p-8 md:p-0 w-full flex flex-col gap-4 justify-center items-center max-w-7xl" data-astro-cid-swhfej32> ${renderComponent($$result, "WrappedBreadcrumb", WrappedBreadcrumb, { "href": "/", "name": "Dashboard", "data-astro-cid-swhfej32": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "BreadcrumbItem", BreadcrumbItem, { "data-astro-cid-swhfej32": true }, { "default": ($$result3) => renderTemplate` <div class="active" data-astro-cid-swhfej32> ${renderComponent($$result3, "BreadcrumbLink", BreadcrumbLink, { "href": "/settings", "aria-current": "page", "data-astro-cid-swhfej32": true }, { "default": ($$result4) => renderTemplate`Configuración de perfil` })} </div> ` })} ` })} </div> <div class="settings-container
              mt-8
              rounded-xl
              bg-white
              w-full
              max-w-7xl
              border
              border-gray-300
              p-12" data-astro-cid-swhfej32> <h2 data-astro-cid-swhfej32>Perfil</h2> <span data-astro-cid-swhfej32>Gestiona tu configuración de perfil</span> <hr class="h-px w-full text-gray-400 my-4" data-astro-cid-swhfej32> <div class="settings flex flex-col gap-4 items-start justify-center" data-astro-cid-swhfej32> <div class="settings-title" data-astro-cid-swhfej32> <h3 data-astro-cid-swhfej32>Cambiar avatar</h3> <span data-astro-cid-swhfej32>Sube una foto en formato JPEG o PNG de máximo 5MB</span> </div> <div class="settings-avatar flex flex-row justify-start items-center gap-6 w-full" data-astro-cid-swhfej32> <div class="settings-pfp size-20 bg-gray-300 rounded-full shadow-md" data-astro-cid-swhfej32></div> <div class="avatar-upload" data-astro-cid-swhfej32> <button class="px-6 py-2 flex flex-row items-center justify-center gap-2 font-semibold bg-gray-200 rounded-lg border border-gray-400 shadow-md hover:bg-gray-300 text-gray-700" data-astro-cid-swhfej32>
Subir imagen
${renderComponent($$result, "Icon", $$Icon, { "icon": "upload", "size": "1.4em", "data-astro-cid-swhfej32": true })} </button> </div> </div> <hr class="h-px w-full text-gray-400 my-4" data-astro-cid-swhfej32> <div class="settings-title" data-astro-cid-swhfej32> <h3 data-astro-cid-swhfej32>Modificar</h3> <span data-astro-cid-swhfej32>Cambia tus credenciales de usuario</span> </div> <div class="username-change" data-astro-cid-swhfej32> <label for="settings-username" data-astro-cid-swhfej32>Usuario</label> <form method="post" data-astro-cid-swhfej32> <div class="input-icon relative top-9 md:top-12 left-2 text-gray-400" data-astro-cid-swhfej32> ${renderComponent($$result, "Icon", $$Icon, { "icon": "at", "size": "1.4em", "data-astro-cid-swhfej32": true })} </div> <input type="text" name="settings-username" id="settings-username" class="px-9 py-3 bg-gray-200 rounded-lg focus:bg-gray-300 focus:ring-inset focus:ring-2 focus:ring-blue-600 shadow-inner" data-astro-cid-swhfej32> <input type="submit" value="Cambiar usuario" class="bg-blue-600 p-3 my-4 rounded-lg text-white font-semibold cursor-pointer hover:bg-blue-700" data-astro-cid-swhfej32> </form> </div> <div class="password-change my-4" data-astro-cid-swhfej32> <label for="settings-password" data-astro-cid-swhfej32>Cambiar contraseña</label> <form action="post" class="flex flex-col justify-start items-start gap-4" data-astro-cid-swhfej32> <div class="input-icon relative top-[90px] left-2 text-gray-400" data-astro-cid-swhfej32> ${renderComponent($$result, "Icon", $$Icon, { "icon": "password", "size": "1.4em", "data-astro-cid-swhfej32": true })} </div> <p data-astro-cid-swhfej32>Contraseña actual</p> <input type="text" name="settings-password" id="settings-password" class="px-9 py-3 bg-gray-200 rounded-lg focus:bg-gray-300 focus:ring-inset focus:ring-2 focus:ring-blue-600 shadow-inner" data-astro-cid-swhfej32> <p data-astro-cid-swhfej32>Nueva contraseña</p> <input type="text" name="settings-password" id="settings-password" class="px-9 py-3 bg-gray-200 rounded-lg focus:bg-gray-300 focus:ring-inset focus:ring-2 focus:ring-blue-600 shadow-inner" data-astro-cid-swhfej32> <p data-astro-cid-swhfej32>Repetir nueva contraseña</p> <input type="text" name="settings-password" id="settings-password" class="px-9 py-3 bg-gray-200 rounded-lg focus:bg-gray-300 focus:ring-inset focus:ring-2 focus:ring-blue-600 shadow-inner" data-astro-cid-swhfej32> <input type="submit" value="Cambiar contraseña" class="bg-blue-600 p-3 w-full rounded-lg text-white font-semibold cursor-pointer hover:bg-blue-700" data-astro-cid-swhfej32> </form> </div> <hr class="h-px w-full text-gray-400 my-4" data-astro-cid-swhfej32> <div class="settings-title" data-astro-cid-swhfej32> <h3 data-astro-cid-swhfej32>Cuenta</h3> <span data-astro-cid-swhfej32>Sobre tu cuenta de usuario</span> </div> <div class="account my-4 flex flex-col justify-center items-start gap-4" data-astro-cid-swhfej32> <label for="settings-delete" data-astro-cid-swhfej32>Eliminar cuenta permanentemente</label> <button class="bg-red-600 p-3 w-full rounded-lg text-white font-semibold cursor-pointer hover:bg-red-700" data-astro-cid-swhfej32>Eliminar permanentemente</button> <label for="settings-cancel" data-astro-cid-swhfej32>Dar de baja temporalmente</label> <button class="bg-orange-600 p-3 w-full rounded-lg text-white font-semibold cursor-pointer hover:bg-orange-700" data-astro-cid-swhfej32>Dar de baja</button> </div> <div class="cancel-text text-sm text-gray-500 flex w-full" data-astro-cid-swhfej32>
Dar de baja no borrará tu cuenta y sus datos permanentemente. Si en
          algún momento quieres recuperarla, bastará con iniciar sesión de nuevo
          para reactivarla.
</div> </div> </div> ${renderComponent($$result, "FooterDashboard", $$FooterDashboard, { "data-astro-cid-swhfej32": true })}  </body> </html>`;
}, "C:/Users/Sandra/Desktop/layout/src/pages/settings.astro", void 0);

const $$file = "C:/Users/Sandra/Desktop/layout/src/pages/settings.astro";
const $$url = "/settings";

export { $$Settings as default, $$file as file, prerender, $$url as url };
