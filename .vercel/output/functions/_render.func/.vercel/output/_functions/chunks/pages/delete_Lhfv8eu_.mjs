import { d as db, T as Tasks } from './_projectId__hDyHbqSq.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

async function del({ request }) {
  const data = await request.json();
  await db.delete(Tasks).where(eq(Tasks.id, data.id));
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" }
  });
}

export { del };
