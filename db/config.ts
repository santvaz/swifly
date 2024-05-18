import { defineDb, defineTable, column, NOW} from 'astro:db';
// https://astro.build/db/config

// Usuarios
const Users = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    username: column.text({unique: true}),
    password: column.text(),
    email: column.text({unique: true}),
    created_at: column.date({default: NOW}),
    deleted_at: column.date({optional: true}),
  }
});

const Projects = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    user_creator: column.text({references: () => Users.columns.username}),
    title: column.text({default: "Mi nuevo proyecto"}),
    description: column.text(),
  }
});

const Category = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    label: column.text({ unique: true }),
  }
});

const Tasks = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    user_creator: column.text({references: () => Users.columns.username}),
    project_id: column.number({references: () => Projects.columns.id}),
    project_owner_username: column.text({references: () => Projects.columns.user_creator}),
    category_id: column.number({references: () => Category.columns.id}),
    title: column.text(),
    description: column.text(),
  }
})

export default defineDb({
  tables: { Users, Projects, Category, Tasks }
});