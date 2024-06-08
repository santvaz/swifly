import { l as lucia } from './github_CWbv_sT1.mjs';
import { d as db, U as Users } from './_projectId__hDyHbqSq.mjs';
import { Argon2id } from 'oslo/password';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

async function POST(context) {
  const formData = await context.request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  if (typeof username !== "string") {
    return new Response("Invalid username", { status: 400 });
  }
  if (typeof password !== "string") {
    return new Response("Invalid password", { status: 400 });
  }
  const foundUser = (await db.select().from(Users).where(eq(Users.username, username))).at(0);
  if (!foundUser) {
    return context.redirect(
      "/400?message=Credenciales%20err%C3%B3neas:%20El%20usuario%20introducido%20no%20existe"
    );
  }
  if (!foundUser.password) {
    return context.redirect(
      "/400?message=Credenciales%20err%C3%B3neas:%20revisa%20correctamente%20tu%20nombre%20de%20usuario%20y%20contrase%C3%B1a"
    );
  }
  const validPassword = await new Argon2id().verify(
    foundUser.password,
    password
  );
  if (!validPassword) {
    return context.redirect(
      "/400?message=Credenciales%20err%C3%B3neas:%20revisa%20correctamente%20tu%20nombre%20de%20usuario%20y%20contrase%C3%B1a"
    );
  }
  const session = await lucia.createSession(foundUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return context.redirect("/dashboard");
}

export { POST };
