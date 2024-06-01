import type { APIContext } from "astro";
import { db, Projects, Users, eq } from "astro:db";

export const prerender = true;

export async function getStaticPaths() {
  const projects = await db.select().from(Projects);
  const paths = projects.map((project) => ({
    params: { projectId: project.id },
  }));
  return paths;
}

export async function GET({ params }: APIContext): Promise<Response> {
  const { projectId } = params;

  const project = await (
    await db.select().from(Projects).where(eq(Projects.id, projectId))
  ).at(0);

  if (!project) {
    throw new Error("Project not found // Proyecto no encontrado");
  }

  return new Response(JSON.stringify(project));
}

export async function PUT(context: APIContext): Promise<Response> {
  const { request, locals, params } = context;
  const { projectId } = params;

  const session = locals.session;

  if (!session) {
    console.error("No user session found");
    return new Response(
      "No user session found // No se encontró una sesión de usuario",
      { status: 401 }
    );
  }

  // get from application json
  const body = await request.json();
  const title = body.title;
  const description = body.description;

  if (!title) {
    console.error("Title is required");
    return new Response("Title is required // Título requerido", {
      status: 400,
    });
  }

  const sessionUserId = session.userId;
  // console.log("Session User ID:", sessionUserId);

  const user = (
    await db.select().from(Users).where(eq(Users.id, sessionUserId))
  ).at(0);

  if (!user) {
    // console.error("User not found with ID:", sessionUserId);
    return new Response("User not found // Usuario no encontrado", {
      status: 404,
    });
  }

  const sessionUsername = user.username;
  // console.log("Found User:", user);
  // console.log("Session Username:", sessionUsername);

  const updateData = {
    // id: projectId,
    // user_creator: sessionUserId, // user_creator should be the ID, not username
    title: title,
    description: description,
  };

  try {
    // console.log("Updating project with values:", updateData);
    await db.update(Projects).set(updateData).where(eq(Projects.id, projectId));
  } catch (error) {
    // console.error("Error updating project:", error);
    return new Response(
      "Error updating project // Error actualizando datos del proyecto",
      { status: 500 }
    );
  }

  const redirectUrl = `/projects/${projectId}`;
  // console.log("Redirecting to URL:", redirectUrl);

  return new Response(null, {
    status: 302,
    headers: {
      Location: redirectUrl,
    },
  });
}
