import { d as db, T as Tasks } from './_projectId__hDyHbqSq.mjs';
import { generateId } from 'lucia';

async function POST({
  params,
  request,
  locals
}) {
  const { projectId } = params;
  console.log("projectId", projectId[0]);
  const userId = locals.user.id;
  console.log("userId", userId);
  const formData = await request.formData();
  const title = formData.get("task-title");
  const category = formData.get("category");
  const id = generateId(15);
  console.log("id", id);
  const task = await db.insert(Tasks).values({
    id,
    title,
    project_id: projectId,
    user_creator: userId,
    category
  });
  return new Response(JSON.stringify(task));
}

export { POST };
