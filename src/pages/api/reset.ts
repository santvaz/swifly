// reset.ts

import { isWithinExpirationDate } from "oslo";
import { hash } from "@node-rs/argon2";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { db, PasswordReset, Users, eq } from "astro:db";
import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
    const formData = await context.request.formData();
    const password = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmNewPassword") as string;
    const verificationToken = context.params.token;

    if (typeof password !== "string" || password.length < 8 || password !== confirmPassword) {
        return new Response("Invalid password or passwords do not match", { status: 400 });
    }

    const tokenHash = encodeHex(await sha256(new TextEncoder().encode(verificationToken)));
    const token = await db.select().from(PasswordReset).where(eq(PasswordReset.token_hash, tokenHash)).execute();

    if (!token || !isWithinExpirationDate(token[0].expires_at)) {
        return new Response("Invalid or expired token", { status: 400 });
    }

    // invalidate the token
    await db.delete(PasswordReset).where(eq(PasswordReset.token_hash, tokenHash));

    // update user password
    const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });
    await db.update(Users).set({ password: passwordHash }).where(eq(Users.id, token[0].user_id)).execute();

    // invalidate user sessions
    await invalidateUserSessions(token[0].user_id);

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/",
            "Referrer-Policy": "no-referrer",
        },
    });
}

// function to invalidate user sessions
async function invalidateUserSessions(userId: string) {
    // Implement this function based on your session management
}
