import { d as db, P as Projects } from './_projectId__hDyHbqSq.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

async function POST(context) {
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
  await db.update(Projects).set({ description }).where(eq(Projects.id, projectId.toString()));
  return context.redirect(currentUrl, 302);
}

export { POST };
