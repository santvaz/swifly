// import type { APIContext } from "astro";
// import { Projects, Tasks, db, eq, and } from "astro:db";

// export async function createTask(context: APIContext): Promise<Response> {
//   const { request, params, locals } = context;
//   const { projectId } = params;
//   const session = locals.session;

//   if (!session) {
//     return new Response("User session not found", { status: 401 });
//   }

//   const body = await request.json();
//   const { title, description, category } = body;

//   if (!title || !category) {
//     return new Response("Title and category are required", { status: 400 });
//   }

//   try {
//     const task = await db.insert(Tasks).values({
//       title: title,
//       description: description,
//       category: category,
//       project_id: projectId,
//       user_creator: session.userId,
//     });

//     return new Response(JSON.stringify(task), { status: 201 });
//   } catch (error) {
//     return new Response("Error creating task", { status: 500 });
//   }
// }

// export async function getTasks(context: APIContext): Promise<Response> {
//   const { params } = context;
//   const { projectId } = params;

//   try {
//     // obtiene todas las tareas asociadas al proyecto
//     const tasks = await db
//       .select()
//       .from(Tasks)
//       .where(eq(Projects.id, projectId));

//     return new Response(JSON.stringify(tasks), { status: 200 });
//   } catch (error) {
//     return new Response("Error fetching tasks", { status: 500 });
//   }
// }

// export async function updateTask(context: APIContext): Promise<Response> {
//   const { request, params, locals } = context;
//   const { projectId, taskId } = params;
//   const session = locals.session;

//   if (!session) {
//     return new Response("User session not found", { status: 401 });
//   }

//   const body = await request.json();
//   const { title, description, category } = body;

//   if (!title && !description && !category) {
//     return new Response("At least one field must be provided for update", {
//       status: 400,
//     });
//   }

//   // update task
//   try {
//     await db
//       .update(Tasks)
//       .set({ title, description, category })
//       .where(and(eq(Tasks.id, taskId), eq(Projects.id, projectId)));

//     return new Response("Task updated successfully", { status: 200 });
//   } catch (error) {
//     return new Response("Error updating task", { status: 500 });
//   }
// }

// export async function deleteTask(context: APIContext): Promise<Response> {
//   const { params, locals } = context;
//   const { projectId, taskId } = params;
//   const session = locals.session;

//   if (!session) {
//     return new Response("User session not found", { status: 401 });
//   }

//   try {
//     await db
//       .delete(Tasks)
//       .where(and(eq(Tasks.id, taskId), eq(Projects.id, projectId)));
//     return new Response("Task deleted successfully", { status: 200 });
//   } catch (error) {
//     return new Response("Error deleting task", { status: 500 });
//   }
// }
