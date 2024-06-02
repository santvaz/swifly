import { db, Tasks, Projects, eq } from "astro:db";
import { generateId } from "lucia";
import type { APIContext } from "astro";

export const prerender = false;

export async function POST({ request, params }: APIContext) {
  const data = await request.json();
  const taskId = generateId(15);

  // Get the project with the provided project_id
  const project = await db
    .select()
    .from(Projects)
    .where(eq(Projects.id, data.project_id))
    .then((projects) => projects[0]);

  if (!project) {
    return new Response(JSON.stringify({ error: "Project not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Use the project's user_creator value
  const userCreator = project.user_creator;

  if (!userCreator) {
    return new Response(JSON.stringify({ error: "User creator not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Insert the new task
  const newTask = await db.insert(Tasks).values({
    id: taskId,
    user_creator: userCreator,
    project_id: data.project_id,
    category_id: data.category_id,
    title: data.title,
    description: data.description,
  });

  return new Response(JSON.stringify(newTask), {
    headers: { "Content-Type": "application/json" },
  });
}
