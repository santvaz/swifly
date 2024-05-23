import { db, Users } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  // TODO
  await db.insert(Users).values([
    {
      email: "pepe@gmail.com",
      username: "pepe",
      password: "1234",
    },
  ]);
}
