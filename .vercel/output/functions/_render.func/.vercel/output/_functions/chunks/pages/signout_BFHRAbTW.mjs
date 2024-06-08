import { l as lucia } from './github_CWbv_sT1.mjs';

async function POST(context) {
  if (!context.locals.session) {
    return new Response(null, {
      status: 401
    });
  }
  await lucia.invalidateSession(context.locals.session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return context.redirect("/login");
}

export { POST };
