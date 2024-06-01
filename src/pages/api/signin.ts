import { lucia } from "@/auth";
import type { APIContext } from "astro";
import { db, Users, eq } from "astro:db";
import { Argon2id } from "oslo/password";

export async function POST(context: APIContext): Promise<Response> {
  // read form data
  const formData = await context.request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  // validate entered data
  if (typeof username !== "string") {
    return new Response("Invalid username", { status: 400 });
  }

  if (typeof password !== "string") {
    return new Response("Invalid password", { status: 400 });
  }

  // search registered user
  const foundUser = (
    await db.select().from(Users).where(eq(Users.username, username))
  ).at(0); // in this case, we will always get one result since `username` column is unique

  // user not found
  if (!foundUser) {
    return context.redirect(
      "/400?message=Credenciales%20err%C3%B3neas:%20El%20usuario%20introducido%20no%20existe"
    );
  }

  // verify if user has password
  if (!foundUser.password) {
    return context.redirect(
      "/400?message=Credenciales%20err%C3%B3neas:%20revisa%20correctamente%20tu%20nombre%20de%20usuario%20y%20contrase%C3%B1a"
    );
  }

  // verify hash
  const validPassword = await new Argon2id().verify(
    foundUser.password,
    password
  );

  // if password is not valid
  if (!validPassword) {
    return context.redirect(
      "/400?message=Credenciales%20err%C3%B3neas:%20revisa%20correctamente%20tu%20nombre%20de%20usuario%20y%20contrase%C3%B1a"
    );
  }

  // password is valid, user can log in
  const session = await lucia.createSession(foundUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return context.redirect("/dashboard");
}
