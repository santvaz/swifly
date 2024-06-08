import { generateId } from 'lucia';
import { d as db, U as Users, P as Projects, a as Permissions } from './_projectId__hDyHbqSq.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

const prerender = false;
async function POST(context) {
  const { request, locals } = context;
  const session = locals.session;
  if (!session) {
    console.error("No user session found");
    return new Response("No user session found", { status: 401 });
  }
  const formData = await request.formData();
  const title = formData.get("project-title")?.toString();
  const description = formData.get("project-description")?.toString();
  if (!title || !description) {
    return new Response("Title and description are required", { status: 400 });
  }
  const sessionUserId = session.userId;
  const foundUser = (await db.select().from(Users).where(eq(Users.id, sessionUserId))).at(0);
  if (!foundUser) {
    console.error("User not found with ID:", sessionUserId);
    return new Response("User not found", { status: 404 });
  }
  foundUser.username;
  const projectId = generateId(15);
  const permissionId = generateId(15);
  try {
    console.log("Inserting project with values:", {
      id: projectId,
      user_creator: sessionUserId,
      title,
      description
    });
    await db.insert(Projects).values([
      {
        id: projectId,
        user_creator: sessionUserId,
        // user_creator should be the ID, not username
        title,
        description
      }
    ]);
    await db.insert(Permissions).values([
      {
        id: permissionId,
        type: "owner",
        user_id: sessionUserId,
        project_id: projectId
      }
    ]);
  } catch (error) {
    console.error("Error inserting project:", error);
    return new Response("Error creating project", { status: 500 });
  }
  const redirectUrl = `/projects/${projectId}`;
  return new Response(null, {
    status: 302,
    headers: {
      Location: redirectUrl
    }
  });
}

export { POST, prerender };
