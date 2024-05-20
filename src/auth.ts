// src/auth.ts
import { Lucia } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle"; // install drizzle ORM via pm i @lucia-auth/adapter-drizzle
import { db, Session, Users } from "astro:db";
import { GitHub } from "arctic";

const adapter = new DrizzleSQLiteAdapter(db as any, Session, Users); // your adapter

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: import.meta.env.PROD
		}
	}
});

export const github = new GitHub(
	import.meta.env.GITHUB_CLIENT_ID,
	import.meta.env.GITHUB_CLIENT_SECRET
);

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}