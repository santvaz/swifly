import { db, Users } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO
  await db.insert(Users).values([
	{
		email: "pepe@gmail.com",
		password: "12345",
		username: "pepito"
	}
  ])
}
