import { TimeSpan, createDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { generateIdFromEntropySize } from "lucia";
import { db, eq, Users, PasswordReset, RateLimit } from "astro:db";
import type { APIContext } from "astro";


export async function POST(context: APIContext):Promise<Response> {
  // parse password reset form data
  const formData = context.request.formData();
  const email = (await formData).get("email");
  
  // validate email
  if (typeof email !== 'string' || email.length < 3){
    return new Response('Email must not be an empty field', {status: 400});
  }

  const user = await db.select().from(Users).where(eq(Users.email, email)).execute();

  if (!user || user.length === 0) {
    return new Response('Invalid email', {status: 400});
  }

  const verificationToken = await createPasswordResetToken(user[0].id);
  const verificationLink = `https://www.swifly.app/forgot/${verificationToken}`;

  await sendPasswordResetToken(email, verificationLink);
  return new Response(null, { status: 200 });
};

async function createPasswordResetToken(userId: string): Promise<string> {
	// optionally invalidate all existing tokens
	await db.delete(PasswordReset).where(eq(PasswordReset.user_id, userId)).execute();
	const tokenId = generateIdFromEntropySize(25); // 40 character
	const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));
	await db.insert(PasswordReset).values({
		token_hash: tokenHash,
		user_id: userId,
		expires_at: createDate(new TimeSpan(2, "h"))
	}).execute();
	return tokenId;
}

// rate limiting middleware
export async function rateLimit(context: APIContext, next: () => Promise<Response>) {
  const ip = context.request.headers.get("x-forwarded-for") || context.clientAddress;
  const currentTime = Date.now();
  const rateLimitData = await db.select().from(RateLimit).where(eq(RateLimit.ip, ip)).execute();

  if (rateLimitData.length > 0) {
    const { lastRequestTime, requestCount } = rateLimitData[0];
    if (currentTime - lastRequestTime < 60000) { // 1 minute window
      if (requestCount >= 5) {
        return new Response('Too many requests, please try again later.', { status: 429 });
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