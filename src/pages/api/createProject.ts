import type { APIContext } from "astro";
import { db, Projects, Users, eq } from "astro:db";
import { generateId } from "lucia";

export async function POST(context: APIContext) {
  try {
    // parse form data
    const formData = await context.request.formData();
    const title = formData.get("project-title");

    if (typeof title !== "string" || title.length === 0) {
      return new Response("Project title is required.", {
        status: 400,
      });
    }

    const user = context.locals.user;

    if (!user || !user.username) {
      return new Response("User not authenticated.", {
        status: 401,
      });
    }

    const userIdResult = await db
      .select({
        id: Users.id,
      })
      .from(Users)
      .where(eq(Users.username, user.username));

    if (userIdResult.length === 0) {
      return new Response("User not found.", {
        status: 404,
      });
    }

    const userId = userIdResult[0].id;

    const projectId = generateId(15);

    // insert data into db
    await db.insert(Projects).values([
      {
        id: projectId,
        title: title,
        user_creator: userId,
      },
    ]);

    return context.redirect("/");
  } catch (error) {
    console.error("Error creating project:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
