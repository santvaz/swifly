import { isWithinExpirationDate } from 'oslo';
import { hash } from '@node-rs/argon2';
import { sha256 } from 'oslo/crypto';
import { encodeHex } from 'oslo/encoding';
import { d as db, b as PasswordReset, U as Users } from './_projectId__hDyHbqSq.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

async function POST(context) {
  const formData = await context.request.formData();
  const password = formData.get("newPassword");
  const confirmPassword = formData.get("confirmNewPassword");
  const verificationToken = context.params.token;
  if (typeof password !== "string" || password.length < 8 || password !== confirmPassword) {
    return new Response("Invalid password or passwords do not match", { status: 400 });
  }
  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(verificationToken)));
  const token = await db.select().from(PasswordReset).where(eq(PasswordReset.token_hash, tokenHash)).execute();
  if (!token || !isWithinExpirationDate(token[0].expires_at)) {
    return new Response("Invalid or expired token", { status: 400 });
  }
  await db.delete(PasswordReset).where(eq(PasswordReset.token_hash, tokenHash));
  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
  });
  await db.update(Users).set({ password: passwordHash }).where(eq(Users.id, token[0].user_id)).execute();
  await invalidateUserSessions(token[0].user_id);
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
      "Referrer-Policy": "no-referrer"
    }
  });
}
async function invalidateUserSessions(userId) {
}

export { POST };
