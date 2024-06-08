import { d as db, U as Users, P as Projects } from './_projectId__hDyHbqSq.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

async function GET({ params }) {
  const { userId } = params;
  const user = (await db.select().from(Users).where(eq(Users.id, userId))).at(
    0
  );
  if (!user) {
    throw new Response("No se encontraron datos.");
  }
  const projects = await db.select().from(Projects).where(eq(Projects.user_creator, userId));
  if (!projects && projects.length === 0) {
    throw new Error(
      `No se encontraron proyectos: podría ser porque no pudimos obtener los resultados correctamente o porque no hay proyectos creados hasta el momento.`
    );
  }
  return new Response(JSON.stringify(projects));
}

export { GET };
