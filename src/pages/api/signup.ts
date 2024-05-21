import type { APIContext } from "astro";
import { generateId } from "lucia"
import { Argon2id } from "oslo/password";
import { db, Users } from "astro:db";
import { lucia } from "@/auth";

export const prerender = false

export async function POST(context: APIContext): Promise<Response> {
    // parse form data
    const formData = context.request.formData();
    const email = (await formData).get("email");
    const username = (await formData).get("username");
    const password = (await formData).get("password");
    // validate form data
    if (!email || !username || !password) {
        return new Response('Email, username and password are required', { status: 400 });
    }

    if (typeof email !== 'string' || email.length < 3) {
        return new Response('Email must not be an empty field', { status: 400 })
    }

    if (typeof username !== 'string' || username.length < 3 || username.length > 31 || !/^[a-z0-9_-]+$/.test(username)) {
        return new Response('Username must be at least 3 characters long', { status: 400 })
    }

    if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
        return new Response('Username must be at least 6 characters long', { status: 400 })
    }

    // insert data into db
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

    // generate session
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );
    return context.redirect("/login")
}