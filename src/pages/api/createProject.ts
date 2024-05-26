import type { APIContext } from "astro";
import { db, Projects, Users, eq } from "astro:db";

export async function POST(context: APIContext) {
  // parse form data
  const formData = await context.request.formData();
  const title = formData.get("project-title");
  //   const description = formData.get("project-description");

  if (typeof title !== "string" || title.length === 0) {
    return new Response("Project title is required.", {
      status: 400,
    });
  }

  const user = context.locals.user;

  const userId = await db
    .select({
      id: Users.id,
    })
    .from(Users);

  const { id } = userId[0];

  // insert data into db
  await db.insert(Projects).values([
    {
      user_creator: user,
      title: title,
    },
  ]);

  return context.redirect("/");
}
