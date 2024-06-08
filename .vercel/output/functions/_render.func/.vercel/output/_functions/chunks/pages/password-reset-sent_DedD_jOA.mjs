/* empty css                        */
import { d as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead } from '../astro_ogGt8jf6.mjs';
import 'kleur/colors';
import { $ as $$Hero, a as $$BaseLayout } from './400_DChj4Xfz.mjs';
/* empty css                                        */

const prerender = false;
const $$PasswordResetSent = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": " Restablecer contrase\xF1a | Swifly", "description": "\xC9xito en el env\xEDo de correo electr\xF3nico para cambiar la contrase\xF1a", "data-astro-cid-rxlhyh3x": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="stack gap-20" data-astro-cid-rxlhyh3x> <main class="wrapper stack gap-8" data-astro-cid-rxlhyh3x> ${renderComponent($$result2, "Hero", $$Hero, { "title": "Restablecer contrase\xF1a", "tagline": "\xA1Est\xE1s m\xE1s cerca de conseguirlo!", "align": "start", "data-astro-cid-rxlhyh3x": true })} <div class="flex justify-center" data-astro-cid-rxlhyh3x> <section class="box input flex justify-center items-center h-fit rounded-none w-full max-w-lg" data-astro-cid-rxlhyh3x> <div class="reset-success flex flex-col gap-6 justify-center items-start rounded-lg w-full" data-astro-cid-rxlhyh3x> <strong class="text-lg text-green-500" data-astro-cid-rxlhyh3x>✨ ¡Enhorabuena! ✨</strong> <span data-astro-cid-rxlhyh3x>Se ha enviado el correo electrónico de recuperación de contraseña
              correspondiente a la cuenta indicada.</span> <em class="text-sm" data-astro-cid-rxlhyh3x>Revisa la bandeja de entrada y sigue los pasos correspondientes
              para recuperar tu cuenta.</em> <a href="/" data-astro-cid-rxlhyh3x>Volver a inicio</a> </div> </section> </div> <!-- <div class="stack gap-20">
    <main class="wrapper stack gap-8">
      <Hero title="Restablecer contraseña" tagline="" align="start" />
      <div class="flex justify-center">
        <section
          class="box input flex justify-center items-center h-fit rounded-none w-full max-w-lg"
        >
          <div
            class="login-logo flex items-center justify-center p-2 bg-neutral-50 mb-4 border border-purple-500 border-opacity-50 rounded-full"
          >
            <Icon
              icon="swifly"
              color="var(--accent-regular)"
              size="2.5em"
              gradient
            />
          </div>
          <form
            method="POST"
            id="confirmReset"
            action="/api/reset"
            class="flex flex-col justify-center gap-8 py-12 items-center w-full"
          >
            <label for="newPassword" class="text-xl">Nueva contraseña</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              class="bg-opacity-50 px-8 py-4 rounded-xl border border-x-[var(--gray-800)] border-y-[var(--gray-600)] focus:outline-none focus:border-purple-600 bg-[var(--gray-900)]"
            />
            <span id="newPasswordError" class="error"></span>
            <label for="confirmNewPassword" class="text-xl"
              >Confirmar nueva contraseña</label
            >
            <input
              type="password"
              name="confirmNewPassword"
              id="confirmNewPassword"
              class="bg-opacity-50 px-8 py-4 rounded-xl border border-x-[var(--gray-800)] border-y-[var(--gray-600)] focus:outline-none focus:border-purple-600 bg-[var(--gray-900)]"
            />
            <span id="confirmNewPasswordError" class="error"></span>
            <input
              type="submit"
              class="shadow-xl"
              value="Cambiar contraseña"
              id="reset"
            />
          </form>
        </section>
      </div>
    </main>
  </div> --> </main>   </div>` })}`;
}, "C:/Users/Sandra/Desktop/layout/src/pages/password-reset-sent.astro", void 0);

const $$file = "C:/Users/Sandra/Desktop/layout/src/pages/password-reset-sent.astro";
const $$url = "/password-reset-sent";

export { $$PasswordResetSent as default, $$file as file, prerender, $$url as url };
