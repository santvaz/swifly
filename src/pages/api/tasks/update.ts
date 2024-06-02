import { db, Tasks, eq } from "astro:db";

export async function PUT({ request }) {
  const data = await request.json();
  const updatedTask = await db
    .update(Tasks)
    .set({
      category_id: data.category_id,
      title: data.title,
      description: data.description,
    })
    .where(eq(Tasks.id, data.id));

  return new Response(JSON.stringify(updatedTask), {
    headers: { "Content-Type": "application/json" },
  });
}
