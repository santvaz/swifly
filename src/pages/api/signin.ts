import { lucia } from "@/auth";
import type { APIContext } from "astro";
import { db, Users, eq } from "astro:db";
import { Argon2id } from "oslo/password";

export const prerender = false

export async function POST(context: APIContext): Promise<Response> {
    // read form data
    const formData = await context.request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    // validate entered data
    if (typeof username !== 'string') {
        return new Response('Invalid username', { status: 400 })
    }

    if (typeof password !== 'string') {
        return new Response('Invalid password', { status: 400 })
    }

    // search registered user
    const foundUsers = (await db
        .select()
        .from(Users)
        .where(eq(Users.username, username))).at(0); // in this case, we will get one result since `username` column is unique

    // user not found
    if (!foundUsers) {
        return new Response('Incorrect username or password', { status: 400 }) // ambiguous answer to avoid hackers from finding which entry value is valid and which one is not
    }

    // verify if user has password
    if (!foundUsers.password) {
        return new Response('Invalid password', { status: 400 })
    }

    // verify hash
    const validPassword = await new Argon2id().verify(
        foundUsers.password,
        password
    );

    // if password is not valid
    if (!validPassword) {
        return new Response('Incorrect username or password', { status: 400 })
    }

    // password is valid, user can log in
    const session = await lucia.createSession(foundUsers.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );
    return context.redirect("/dashboard");
}