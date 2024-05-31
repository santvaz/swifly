// src/pages/api/projects/[userId].ts
import type { APIContext } from "astro";
import { db, Projects, eq } from "astro:db";

export async function GET({ params }: APIContext) {
  const { userId } = params;
  console.log("API userId:", userId);

  if (!userId) {
    console.log("User id is required");
    return new Response("User id is required", { status: 400 });
  }

  const projects = await db
    .select()
    .from(Projects)
    .where(eq(Projects.user_creator, userId));

  console.log("Fetched projects from DB:", projects);

  if (projects.length === 0) {
    console.log(`Projects from user id ${userId} not found`);
    return new Response(
      `Projects from user id ${userId} not found`,
      { status: 404 }
    );
  }

  const projectDetails = projects.map((project) => ({
    title: project.title,
    description: project.description,
    author: project.user_creator,
  }));

  console.log("Project details:", projectDetails);

  return new Response(JSON.stringify(projectDetails), { status: 200 });
}
