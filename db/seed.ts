import { db, Users, Projects } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  // TODO
  await db.insert(Users).values([
    {
      id: "nwiery6h3w13o07",
      email: "pepe@gmail.com",
      username: 'pepe',
      password: '1234',
    }
  ])

  await db.insert(Projects).values([
    {
      id: "wq2ed201ads4a8da5df",
      title: "Trabajo de Fin de Grado",
      user_creator: "nwiery6h3w13o07",
    },
  ]);
} 
