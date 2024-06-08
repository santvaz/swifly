import { createRemoteDatabaseClient, asDrizzleTable } from '@astrojs/db/runtime';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

const db = await createRemoteDatabaseClient(process.env.ASTRO_STUDIO_APP_TOKEN, {"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://www.swifly.app", "ASSETS_PREFIX": undefined}.ASTRO_STUDIO_REMOTE_DB_URL ?? "https://db.services.astro.build");
const Users = asDrizzleTable("Users", { "columns": { "id": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "Users", "primaryKey": true, "optional": false } }, "username": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "username", "collection": "Users", "primaryKey": false, "optional": false } }, "password": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "password", "collection": "Users", "primaryKey": false, "optional": true } }, "github_id": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "github_id", "collection": "Users", "primaryKey": false, "optional": true } }, "email": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "email", "collection": "Users", "primaryKey": false, "optional": true } }, "created_at": { "type": "date", "schema": { "optional": false, "unique": false, "deprecated": false, "name": "created_at", "collection": "Users", "default": { "__serializedSQL": true, "sql": "CURRENT_TIMESTAMP" } } }, "deleted_at": { "type": "date", "schema": { "optional": true, "unique": false, "deprecated": false, "name": "deleted_at", "collection": "Users" } } }, "deprecated": false, "indexes": {} }, false);
const Session = asDrizzleTable("Session", { "columns": { "id": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "Session", "primaryKey": false, "optional": false } }, "userId": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "userId", "collection": "Session", "primaryKey": false, "optional": false, "references": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "Users", "primaryKey": true, "optional": false } } } }, "expiresAt": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "expiresAt", "collection": "Session", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);
const PasswordReset = asDrizzleTable("PasswordReset", { "columns": { "token_hash": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "token_hash", "collection": "PasswordReset", "primaryKey": false, "optional": false } }, "user_id": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "user_id", "collection": "PasswordReset", "primaryKey": false, "optional": false, "references": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "Users", "primaryKey": true, "optional": false } } } }, "expires_at": { "type": "date", "schema": { "optional": false, "unique": false, "deprecated": false, "name": "expires_at", "collection": "PasswordReset" } } }, "deprecated": false, "indexes": {} }, false);
const RateLimit = asDrizzleTable("RateLimit", { "columns": { "ip": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "ip", "collection": "RateLimit", "primaryKey": false, "optional": false } }, "lastRequestTime": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "lastRequestTime", "collection": "RateLimit", "primaryKey": false, "optional": false } }, "requestCount": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "requestCount", "collection": "RateLimit", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);
const Projects = asDrizzleTable("Projects", { "columns": { "id": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "Projects", "primaryKey": true, "optional": false } }, "user_creator": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "user_creator", "collection": "Projects", "primaryKey": false, "optional": false, "references": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "Users", "primaryKey": true, "optional": false } } } }, "title": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "title", "collection": "Projects", "primaryKey": false, "optional": false } }, "description": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "description", "collection": "Projects", "primaryKey": false, "optional": true } } }, "deprecated": false, "indexes": {} }, false);
const Tasks = asDrizzleTable("Tasks", { "columns": { "id": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "Tasks", "primaryKey": true, "optional": false } }, "title": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "title", "collection": "Tasks", "primaryKey": false, "optional": false } }, "category": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "category", "collection": "Tasks", "primaryKey": false, "optional": false } }, "user_creator": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "user_creator", "collection": "Tasks", "primaryKey": false, "optional": false, "references": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "Users", "primaryKey": true, "optional": false } } } }, "project_id": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "project_id", "collection": "Tasks", "primaryKey": false, "optional": false, "references": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "Projects", "primaryKey": true, "optional": false } } } } }, "deprecated": false, "indexes": {} }, false);
const Permissions = asDrizzleTable("Permissions", { "columns": { "id": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "Permissions", "primaryKey": true, "optional": false } }, "type": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "type", "collection": "Permissions", "primaryKey": false, "optional": false } }, "user_id": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "user_id", "collection": "Permissions", "primaryKey": false, "optional": false, "references": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "Users", "primaryKey": true, "optional": false } } } }, "project_id": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "project_id", "collection": "Permissions", "primaryKey": false, "optional": false, "references": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "Projects", "primaryKey": true, "optional": false } } } } }, "deprecated": false, "indexes": {} }, false);
const AstrojsWebVitals_Metric = asDrizzleTable("AstrojsWebVitals_Metric", { "columns": { "pathname": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "pathname", "collection": "AstrojsWebVitals_Metric", "primaryKey": false, "optional": false } }, "route": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "route", "collection": "AstrojsWebVitals_Metric", "primaryKey": false, "optional": false } }, "name": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "name", "collection": "AstrojsWebVitals_Metric", "primaryKey": false, "optional": false } }, "id": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "AstrojsWebVitals_Metric", "primaryKey": true } }, "value": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "value", "collection": "AstrojsWebVitals_Metric", "primaryKey": false, "optional": false } }, "rating": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "rating", "collection": "AstrojsWebVitals_Metric", "primaryKey": false, "optional": false } }, "timestamp": { "type": "date", "schema": { "optional": false, "unique": false, "deprecated": false, "name": "timestamp", "collection": "AstrojsWebVitals_Metric" } } }, "deprecated": true, "indexes": {} }, false);

async function GET({ params }) {
  const { projectId } = params;
  const project = (await db.select().from(Projects).where(eq(Projects.id, projectId))).at(0);
  if (!project) {
    throw new Error("Project not found // Proyecto no encontrado");
  }
  return new Response(JSON.stringify(project));
}
async function PUT(context) {
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
  const body = await request.json();
  const title = body.title;
  const description = body.description;
  if (!title) {
    console.error("Title is required");
    return new Response("Title is required // Título requerido", {
      status: 400
    });
  }
  const sessionUserId = session.userId;
  const user = (await db.select().from(Users).where(eq(Users.id, sessionUserId))).at(0);
  if (!user) {
    return new Response("User not found // Usuario no encontrado", {
      status: 404
    });
  }
  user.username;
  const updateData = {
    // id: projectId,
    // user_creator: sessionUserId, // user_creator should be the ID, not username
    title,
    description
  };
  try {
    await db.update(Projects).set(updateData).where(eq(Projects.id, projectId));
  } catch (error) {
    return new Response(
      "Error updating project // Error actualizando datos del proyecto",
      { status: 500 }
    );
  }
  const redirectUrl = `/projects/${projectId}`;
  return new Response(null, {
    status: 302,
    headers: {
      Location: redirectUrl
    }
  });
}

const _projectId_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET,
	PUT
}, Symbol.toStringTag, { value: 'Module' }));

export { AstrojsWebVitals_Metric as A, Projects as P, RateLimit as R, Session as S, Tasks as T, Users as U, _projectId_ as _, Permissions as a, PasswordReset as b, db as d };
