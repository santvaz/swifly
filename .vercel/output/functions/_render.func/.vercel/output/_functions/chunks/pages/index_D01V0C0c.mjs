import { d as db, T as Tasks } from './_projectId__hDyHbqSq.mjs';

async function GET() {
  try {
    const tasks = await db.select().from(Tasks);
    return new Response(JSON.stringify(tasks), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export { GET };
