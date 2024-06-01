import { defineDb, defineTable, column, NOW, sql } from "astro:db";
// https://astro.build/db/configA

// Usuarios
const Users = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    username: column.text({ unique: true, optional: false }),
    password: column.text({ optional: true }), // optional in order to let users login with github
    github_id: column.text({ optional: true, unique: true }),
    email: column.text({ unique: true, optional: true }),
    created_at: column.date({ default: NOW }),
    deleted_at: column.date({ optional: true }),
  },
});

const Session = defineTable({
  columns: {
    id: column.text({ optional: false, unique: true }),
    userId: column.text({
      optional: false,
      references: () => Users.columns.id,
    }),
    expiresAt: column.number({ optional: false }),
  },
});

const PasswordReset = defineTable({
  columns: {
    token_hash: column.text({ unique: true, optional: false }),
    user_id: column.text({
      optional: false,
      references: () => Users.columns.id,
    }),
    expires_at: column.date(),
  },
});

const RateLimit = defineTable({
  columns: {
    ip: column.text({ unique: true, optional: false }),
    lastRequestTime: column.number({ optional: false }),
    requestCount: column.number({ optional: false }),
  },
});

const Projects = defineTable({
  columns: {
    id: column.text({
      primaryKey: true,
      autoIncrement: true,
      optional: false,
      unique: true,
    }),
    user_creator: column.text({ references: () => Users.columns.id }),
    title: column.text(), // NOT NULL by default
    description: column.text({ optional: true }),
  },
});

const Tasks = defineTable({
  columns: {
    id: column.text({
      primaryKey: true,
      autoIncrement: true,
      optional: false,
      unique: true,
    }),
    user_creator: column.text({ references: () => Users.columns.id }),
    project_id: column.text({ references: () => Projects.columns.id }),
    category_id: column.text({ references: () => Categories.columns.id }),
    title: column.text(),
    description: column.text({ optional: true }),
  },
});

const Categories = defineTable({
  columns: {
    id: column.text({
      primaryKey: true,
      autoIncrement: true,
      optional: false,
      unique: true,
    }),
    label: column.text({
      unique: true,
      check: sql`label IN ('backlog', 'to do', 'doing', 'done')`, // restriction to only these four values
    }), // 'backlog', 'to do', 'doing' or 'done'
  },
});

const Permissions = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    type: column.text(),
    user_id: column.text({ references: () => Users.columns.id }),
    project_id: column.text({ references: () => Projects.columns.id }),
  },
});

export default defineDb({
  tables: {
    Users,
    Session,
    PasswordReset,
    RateLimit,
    Projects,
    Tasks,
    Categories,
    Permissions,
  },
});
