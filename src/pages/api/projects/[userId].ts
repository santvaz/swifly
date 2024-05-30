import type { APIContext } from "astro";
import { db, Projects, Users, eq } from "astro:db";

export const prerender = true;

export async function getStaticPaths() {
  const users = await db.select().from(Users);

  console.log("users", users);

  const paths = users.map((user) => ({
    params: { userId: user.id },
  }));
  console.log("paths", paths);
  return paths;
}

export async function GET({ params }: APIContext) {
  const { userId } = params;
  console.log("userId", userId);

  const user = await (
    await db.select().from(Users).where(eq(Users.id, userId))
  ).at(0);

  if (!userId) {
    throw new Error("User id is required");
  }

  const projects = await db
    .select()
    .from(Projects)
    .where(eq(Projects.user_creator, userId));

  if (projects.length === 0) {
    throw new Error(
      `Projects from user id ${userId} not found: could be because we couldn't fetch results correctly or because the user doesn't have any projects created.`
    );
  }

  return new Response(JSON.stringify(projects));
}
