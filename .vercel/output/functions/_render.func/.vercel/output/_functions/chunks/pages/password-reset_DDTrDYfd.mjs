import { createDate, TimeSpan } from 'oslo';
import { sha256 } from 'oslo/crypto';
import { encodeHex } from 'oslo/encoding';
import { generateIdFromEntropySize } from 'lucia';
import { d as db, U as Users, b as PasswordReset, R as RateLimit } from './_projectId__hDyHbqSq.mjs';
import { sendPasswordResetEmail } from './sendEmail_Dm7DiNZe.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

async function POST(context) {
  const rateLimitResponse = await rateLimit(
    context,
    () => Promise.resolve(new Response())
  );
  if (rateLimitResponse.status === 429) {
    return rateLimitResponse;
  }
  const formData = context.request.formData();
  const email = (await formData).get("email");
  if (typeof email !== "string" || email.length < 3) {
    return new Response("Email must be a valid data type", { status: 400 });
  }
  const user = await db.select().from(Users).where(eq(Users.email, email)).execute();
  if (!user || user.length === 0) {
    return new Response("Invalid email", { status: 400 });
  }
  const verificationToken = await createPasswordResetToken(user[0].id);
  const verificationLink = `www.swifly.app/forgot?=${verificationToken}`;
  const emailSent = await sendPasswordResetEmail(email, verificationLink);
  if (!emailSent) {
    return new Response("Failed to send email", { status: 500 });
  }
  return context.redirect("/password-reset-sent");
}
async function createPasswordResetToken(userId) {
  await db.delete(PasswordReset).where(eq(PasswordReset.user_id, userId)).execute();
  const tokenId = generateIdFromEntropySize(25);
  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));
  await db.insert(PasswordReset).values({
    token_hash: tokenHash,
    user_id: userId,
    expires_at: createDate(new TimeSpan(2, "h"))
  }).execute();
  return tokenId;
}
async function rateLimit(context, next) {
  const ip = context.request.headers.get("x-forwarded-for") || context.clientAddress;
  const currentTime = Date.now();
  const rateLimitData = await db.select().from(RateLimit).where(eq(RateLimit.ip, ip)).execute();
  if (rateLimitData.length > 0) {
    const { lastRequestTime, requestCount } = rateLimitData[0];
    if (currentTime - lastRequestTime < 6e6) {
      if (requestCount >= 5) {
        return new Response("Too many requests, please try again in 1 hour.", {
          status: 429
        });
      }
      await db.update(RateLimit).set({ requestCount: requestCount + 1 }).where(eq(RateLimit.ip, ip)).execute();
    } else {
      await db.update(RateLimit).set({ lastRequestTime: currentTime, requestCount: 1 }).where(eq(RateLimit.ip, ip)).execute();
    }
  } else {
    await db.insert(RateLimit).values({ ip, lastRequestTime: currentTime, requestCount: 1 }).execute();
  }
  return next();
}

export { POST, rateLimit };
