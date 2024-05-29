import type { APIContext } from "astro";
import { Users, Projects, db, eq } from "astro:db";

export const prerender = false;

export async function GET(context: APIContext): Promise<Response> {
    
}

//   const sessionUserId = session.userId;
//   console.log("Session User ID:", sessionUserId);

//   const foundUser = (
//     await db.select().from(Users).where(eq(Users.id, sessionUserId))
//   ).at(0);

//   if (!foundUser) {
//     console.error("User not found with ID:", sessionUserId);
//     return new Response("User not found", { status: 404 });
//   }

//   const sessionUsername = foundUser.username;
//   console.log("LISTING PROJECTS:");
//   console.log("Found User:", foundUser);
//   console.log("Session Username:", sessionUsername);

//   try {
//     await db.select().from(Projects).where(eq(sessionUserId, Users.id));
//   } catch (error) {
//     console.error("Error listing projects:", error);
//     return new Response(`Error listing projects for user: ${sessionUsername}`);
//   }
