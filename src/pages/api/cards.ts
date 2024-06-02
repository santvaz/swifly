import type { APIContext } from "astro";
import { db, Projects, Users, eq, Tasks } from "astro:db";
import { generateId } from "lucia";

// primero quiero ver si puedo hacer un get de las tareas de un proyecto
// para eso primero necesito obtener el id del proyecto
// y luego buscar las tareas que tengan ese id de proyecto
// y devolverlas
// una vez hago eso necesito poder listarlas en función de su columna
// y luego poder moverlas de columna
// y al moverlas de columna actualizar en base de datos la columna a la que pertenecen
// también necesito poder crear nuevas tareas
// y eliminar tareas existentes

// export async function GET({ params }: APIContext): Promise<Response> {
//   const { projectId } = params;

//   const getTasks = (
//     await db.select().from(Tasks).where(eq(Tasks.project_id, projectId))
//   ).at(0);

//   if (!getTasks) {
//     throw new Error("Tasks not found // Tareas no encontradas");
//   }

//   console.log(getTasks);
//   return new Response(JSON.stringify(getTasks));

//   //   return new Response(JSON.stringify(tasks));
// }

export async function POST({
  params,
  request,
  locals,
}: APIContext): Promise<Response> {
  const { projectId } = params;
  console.log("projectId", projectId[0]);
  const userId = locals.user.id; // Get user's id from locals
  console.log("userId", userId);
  const formData = await request.formData();
  const title = formData.get("task-title");
  const category = formData.get("category");
  const id = generateId(15);
  console.log("id", id);

  const task = await db.insert(Tasks).values({
    id: id as string,
    title: title as string,
    project_id: projectId as string,
    user_creator: userId as string,
    category: category as string,
  });

  return new Response(JSON.stringify(task));
}
