import { d as db, T as Tasks } from './_projectId__hDyHbqSq.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

async function PUT({ request }) {
  const data = await request.json();
  const updatedTask = await db.update(Tasks).set({
    category_id: data.category_id,
    title: data.title,
    description: data.description
  }).where(eq(Tasks.id, data.id));
  return new Response(JSON.stringify(updatedTask), {
    headers: { "Content-Type": "application/json" }
  });
}

export { PUT };
