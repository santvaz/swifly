import type { APIContext } from "astro";
import { db, Projects, eq } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
  const { request } = context;
  const formData = await request.formData();
  const currentUrl = formData.get("current-url")?.toString();
  const projectId = formData.get("project-id-description")?.toString();
  const updatedDescription = formData.get("project-edit-description");

  console.log("Form Data:", [...formData]);

  if (!projectId) {
    return new Response("Project ID is required", { status: 400 });
  }

  if (!updatedDescription) {
    return new Response("Description is required", { status: 400 });
  }

  const description = updatedDescription.toString();
  await db
    .update(Projects)
    .set({ description: description })
    .where(eq(Projects.id, projectId.toString()));

  // return new Response("Description updated successfully", { status: 200 });
  return context.redirect(currentUrl, 302);
}
