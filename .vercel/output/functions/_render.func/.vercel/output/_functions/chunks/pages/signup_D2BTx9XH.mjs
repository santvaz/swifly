import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { d as db, U as Users } from './_projectId__hDyHbqSq.mjs';
import './github_CWbv_sT1.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

async function POST(context) {
  const formData = context.request.formData();
  const email = (await formData).get("email");
  const username = (await formData).get("username");
  const password = (await formData).get("password");
  if (!email || !username || !password) {
    return context.redirect(
      "/400?message=Correo%20electr%C3%B3nico,%20nombre%20de%20usuario%20y%20contrase%C3%B1a%20son%20obligatorios%20para%20registrarse"
    );
  }
  const emailExists = await db.select().from(Users).where(eq(Users.email, email.toString()));
  if (emailExists.length) {
    return context.redirect(
      "/400?message=El%20correo%20electr%C3%B3nico%20ya%20existe.%20Introduce%20un%20correo%20electr%C3%B3nico%20diferente%20para%20continuar"
    );
  }
  const usernameExists = await db.select().from(Users).where(eq(Users.username, username.toString()));
  if (usernameExists.length) {
    return context.redirect(
      "/400?message=El%20nombre%20de%20usuario%20ya%20existe.%20Introduce%20uno%20distinto%20para%20continuar"
    );
  }
  if (typeof email !== "string" || email.length < 6 || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return context.redirect(
      "/400?message=Correo%20electr%C3%B3nico%20incorrecto.%20Introduce%20un%20correo%20v%C3%A1lido%20para%20continuar"
    );
  }
  if (typeof username !== "string" || username.length < 3 || username.length > 31 || !/^[a-zA-Z0-9_.-]+$/.test(username)) {
    return context.redirect(
      "/400?message=Nombre%20de%20usuario%20incorrecto.%20Introduce%20un%20nombre%20de%20usuario%20v%C3%A1lido%20para%20continuar"
    );
  }
  if (typeof password !== "string" || password.length < 6 || password.length > 255 || !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
    return context.redirect(
      "/400?message=Contrase%C3%B1a%20incorrecta.%20Introduce%20una%20contrase%C3%B1a%20v%C3%A1lida%20para%20continuar"
    );
  }
  const userId = generateId(15);
  const hashedPassword = await new Argon2id().hash(password);
  await db.insert(Users).values([
    {
      id: userId,
      email,
      username,
      password: hashedPassword
    }
  ]);
  return context.redirect("/signup-success");
}

export { POST };
