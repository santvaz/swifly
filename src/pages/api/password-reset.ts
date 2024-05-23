import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { generateIdFromEntropySize } from "lucia";
import { db, eq, Users, PasswordReset, RateLimit } from "astro:db";
import type { APIContext } from "astro";
import { sendPasswordResetEmail } from "./sendEmail.json";

export async function POST(context: APIContext): Promise<Response> {
  // limit requests with async function
  const rateLimitResponse = await rateLimit(context, () =>
    Promise.resolve(new Response())
  );

  if (rateLimitResponse.status === 429) {
    return rateLimitResponse;
  }

  // parse password reset form data
  const formData = context.request.formData();
  const email = (await formData).get("email");

  // validate email
  if (typeof email !== "string" || email.length < 3) {
    return new Response("Email must be a valid data type", { status: 400 });
  }

  const user = await db
    .select()
    .from(Users)
    .where(eq(Users.email, email))
    .execute();

  if (!user || user.length === 0) {
    return new Response("Invalid email", { status: 400 });
  }

  const verificationToken = await createPasswordResetToken(user[0].id);
  const verificationLink = `http://localhost:4321/forgot?token=${verificationToken}`;

  const emailSent = await sendPasswordResetEmail(email, verificationLink);

  if (!emailSent) {
    return new Response("Failed to send email", { status: 500 });
  }

  return context.redirect("/password-reset-sent");
  // OK
  // return new Response(null, { status: 200 });
}

async function createPasswordResetToken(userId: string): Promise<string> {
  // optionally invalidate all existing tokens
  await db
    .delete(PasswordReset)
    .where(eq(PasswordReset.user_id, userId))
    .execute();
  const tokenId = generateIdFromEntropySize(25); // 40 character
  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));
  await db
    .insert(PasswordReset)
    .values({
      token_hash: tokenHash,
      user_id: userId,
      expires_at: createDate(new TimeSpan(2, "h")),
    })
    .execute();
  return tokenId;
}

// rate limiting middleware
export async function rateLimit(
  context: APIContext,
  next: () => Promise<Response>
) {
  const ip =
    context.request.headers.get("x-forwarded-for") || context.clientAddress;
  const currentTime = Date.now();
  const rateLimitData = await db
    .select()
    .from(RateLimit)
    .where(eq(RateLimit.ip, ip))
    .execute();

  if (rateLimitData.length > 0) {
    const { lastRequestTime, requestCount } = rateLimitData[0];
    if (currentTime - lastRequestTime < 6000000) {
      // 1 minute window
      if (requestCount >= 5) {
        return new Response("Too many requests, please try again in 1 hour.", {
          status: 429,
        });
      }
      await db
        .update(RateLimit)
        .set({ requestCount: requestCount + 1 })
        .where(eq(RateLimit.ip, ip))
        .execute();
    } else {
      await db
        .update(RateLimit)
        .set({ lastRequestTime: currentTime, requestCount: 1 })
        .where(eq(RateLimit.ip, ip))
        .execute();
    }
  } else {
    await db
      .insert(RateLimit)
      .values({ ip, lastRequestTime: currentTime, requestCount: 1 })
      .execute();
  }
  return next();
}

export async function GET(context: APIContext): Promise<Response> {
  console.log("");
  const params = new URL(context.request.url).searchParams;
  const verificationToken = params.get("token");

  if (!verificationToken) {
    return new Response("Token not provided", { status: 400 });
  }

  const tokenHash = encodeHex(
    await sha256(new TextEncoder().encode(verificationToken))
  );

  const token = await db
    .select()
    .from(PasswordReset)
    .where(eq(PasswordReset.token_hash, tokenHash))
    .execute();

  if (
    !token ||
    token.length === 0 ||
    !isWithinExpirationDate(token[0].expires_at)
  ) {
    return new Response("Invalid or expired token", { status: 400 });
  }

  // valid token
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Restablecer Contraseña | Swifly</title>
    </head>
    <body>
      <div id="app">
        <BaseLayout title="Restablecer contraseña | Swifly" description="Formulario para restablecer la contraseña">
          <div class="stack gap-20">
            <main class="wrapper stack gap-8">
              <Hero title="Restablecer contraseña" tagline="" align="start" />
              <div class="flex justify-center">
                <section class="box input flex justify-center items-center h-fit rounded-none w-full max-w-lg">
                  <div class="login-logo flex items-center justify-center p-2 bg-neutral-50 mb-4 border border-purple-500 border-opacity-50 rounded-full">
                    <Icon icon="swifly" color="var(--accent-regular)" size="2.5em" gradient />
                  </div>
                  <form method="POST" id="confirmReset" action="/api/reset-password" class="flex flex-col justify-center gap-8 py-12 items-center w-full">
                    <label for="newPassword" class="text-xl">Nueva contraseña</label>
                    <input type="password" name="newPassword" id="newPassword" class="bg-opacity-50 px-8 py-4 rounded-xl border border-x-[var(--gray-800)] border-y-[var(--gray-600)] focus:outline-none focus:border-purple-600 bg-[var(--gray-900)]" />
                    <span id="newPasswordError" class="error"></span>
                    <label for="confirmNewPassword" class="text-xl">Confirmar nueva contraseña</label>
                    <input type="password" name="confirmNewPassword" id="confirmNewPassword" class="bg-opacity-50 px-8 py-4 rounded-xl border border-x-[var(--gray-800)] border-y-[var(--gray-600)] focus:outline-none focus:border-purple-600 bg-[var(--gray-900)]" />
                    <span id="confirmNewPasswordError" class="error"></span>
                    <input type="submit" class="shadow-xl" value="Cambiar contraseña" id="reset" />
                  </form>
                </section>
              </div>
            </main>
          </div>
        </BaseLayout>
      </div>
    </body>
    </html>
  `;
  return new Response(html);
}
