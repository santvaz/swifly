import { d as db, T as Tasks } from './_projectId__hDyHbqSq.mjs';
import { generateId } from 'lucia';

async function POST({
  params,
  request,
  locals
}) {
  const { projectId } = params;
  const userId = locals.user.id;
  const formData = await request.formData();
  const title = formData.get("task-title");
  const category = formData.get("category");
  const id = generateId(15);
  await db.insert(Tasks).values({
    id,
    title,
    project_id: projectId,
    user_creator: userId,
    category
  });
  const redirectUrl = `/projects/${projectId}`;
  return Response.redirect(redirectUrl, 303);
}

export { POST };
