import type { APIContext } from "astro";
import { db, Projects, Users, eq } from "astro:db";

// export const prerender = true;

// export async function getStaticPaths() {
//   const users = await db.select().from(Users);
//   const paths = users.map((user) => ({
//     params: { userId: user.id },
//   }));
//   return paths;
// }

export async function GET({ params }: APIContext) {
  const { userId } = params;
  const user = (await db.select().from(Users).where(eq(Users.id, userId))).at(
    0
  );

  if (!user) {
    throw new Response("No se encontraron datos.");
  }

  const projects = await db
    .select()
    .from(Projects)
    .where(eq(Projects.user_creator, userId));

  if (!projects && projects.length === 0) {
    throw new Error(
      `No se encontraron proyectos: podría ser porque no pudimos obtener los resultados correctamente o porque no hay proyectos creados hasta el momento.`
    );
  }

  return new Response(JSON.stringify(projects));
}
