import type { APIContext } from "astro";
import { Tasks, db } from "astro:db";
import { generateId } from "lucia";

export async function POST({
  params,
  request,
  locals,
}: APIContext): Promise<Response> {
  const { projectId } = params;
  const userId = locals.user.id;
  const formData = await request.formData();
  const title = formData.get("task-title");
  const category = formData.get("category");
  const id = generateId(15);

  const task = await db.insert(Tasks).values({
    id: id as string,
    title: title as string,
    project_id: projectId as string,
    user_creator: userId as string,
    category: category as string,
  });

  // Redirigir al usuario al project id
  const redirectUrl = `/projects/${projectId}`;
  return Response.redirect(redirectUrl, 303);
}
