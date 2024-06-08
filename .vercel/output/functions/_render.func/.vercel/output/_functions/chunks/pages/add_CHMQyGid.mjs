import { d as db, P as Projects, T as Tasks } from './_projectId__hDyHbqSq.mjs';
import { generateId } from 'lucia';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

const prerender = false;
async function POST({ request, params }) {
  const data = await request.json();
  const taskId = generateId(15);
  const project = await db.select().from(Projects).where(eq(Projects.id, data.project_id)).then((projects) => projects[0]);
  if (!project) {
    return new Response(JSON.stringify({ error: "Project not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }
  const userCreator = project.user_creator;
  if (!userCreator) {
    return new Response(JSON.stringify({ error: "User creator not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }
  const newTask = await db.insert(Tasks).values({
    id: taskId,
    user_creator: userCreator,
    project_id: data.project_id,
    category_id: data.category_id,
    title: data.title,
    description: data.description
  });
  return new Response(JSON.stringify(newTask), {
    headers: { "Content-Type": "application/json" }
  });
}

export { POST, prerender };
