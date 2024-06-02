import { db, Tasks, eq } from "astro:db";

export async function del({ request }) {
  const data = await request.json();
  await db.delete(Tasks).where(eq(Tasks.id, data.id)); // delete task where id matches data.id

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
