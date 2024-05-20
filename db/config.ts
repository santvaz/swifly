import { defineDb, defineTable, column, NOW, sql } from 'astro:db';
import { isNull } from 'drizzle-orm';
// https://astro.build/db/config

// Usuarios
const Users = defineTable({
  columns: {
    id: column.text({ primaryKey: true, default: sql`uuid()` }),
    username: column.text({unique: true}),
    password: column.text(),
    email: column.text({unique: true}),
    created_at: column.date({default: NOW}),
    deleted_at: column.date({optional: true}),
  }
});

const Projects = defineTable({
  columns: {
    id: column.text({ primaryKey: true, default: sql`uuid()` }),
    user_creator: column.text({references: () => Users.columns.id}),
    title: column.text(), // NOT NULL by default
    description: column.text({optional: true}),
  }
});

const Tasks = defineTable({
  columns: {
    id: column.text({ primaryKey: true, default: sql`uuid()` }),
    user_creator: column.text({references: () => Users.columns.id}),
    project_id: column.text({references: () => Projects.columns.id}),
    category_id: column.text({references: () => Categories.columns.id}),
    title: column.text(),
    description: column.text({optional: true}),
  }
});

const Categories = defineTable({
  columns: {
    id: column.text({ primaryKey: true, default: sql`uuid()` }),
    label: column.text({
      unique: true,
      check: sql`label IN ('to do', 'doing', 'done)` // restriction to only allow these three values
    }), // 'to do', 'doing' or 'done'
  }
});

const Permissions = defineTable({
  columns: {
    id: column.text({ primaryKey: true, default: sql`uuid()` }),
    type: column.text(),
    user_id: column.text({references: () => Users.columns.id}),
    project_id: column.text({references: () => Projects.columns.id}),
  }
});

export default defineDb({
  tables: { Users, Projects, Tasks, Categories, Permissions }
});