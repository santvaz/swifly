import { defineDb, defineTable, column, NOW} from 'astro:db';
// https://astro.build/db/config

// Usuarios
const usuarios = defineTable({
  columns: {
    user_id: column.number({primaryKey: true, autoIncrement: true}),
    username: column.text({unique: true}),
    password: column.text(),
    email: column.text({unique: true}),
    created_at: column.date({default: NOW}),
    deleted_at: column.date({optional: true}),
  }
});

// Proyectos
const proyectos = defineTable({
  columns: {
    project_id: column.text({primaryKey: true, autoIncrement: true}),
    user_id: column.number(),
    name: column.text(),
    description: column.text({optional: true}),
    created_at: column.date({default: NOW}),
    updated_at: column.date({default: NOW})
  },
  foreignKeys: [
    {
      columns: ["user_id"],
      references: () => [usuarios.columns.user_id],
    },
  ],
})

// Roles en proyecto
const rolesProyecto = defineTable({
  columns: {
    role_id: column.text({primaryKey: true, autoIncrement: true}),
    project_id: column.number(),
    user_id: column.number(),
    role: column.text()
  },
  foreignKeys: [
    {
      columns: ["project_id"],
      references: () => [proyectos.columns.project_id],
    },
    {
      columns: ["user_id"],
      references: () => [usuarios.columns.user_id],
    },
  ],
})

// LogsBajas
const logsBajas = defineTable({
  columns: {
    log_id: column.number({ primaryKey: true, autoIncrement: true }),
    user_id: column.number(),
    date_baja: column.date({ default: NOW })
  },
  foreignKeys: [
    {
      columns: ["user_id"],
      references: () => [usuarios.columns.user_id],
    },
  ],
});

// LogsEliminados
const logsEliminados = defineTable({
  columns: {
    log_id: column.number({ primaryKey: true, autoIncrement: true }),
    user_id: column.number(),
    date_eliminado: column.date({ default: NOW })
  },
  foreignKeys: [
    {
      columns: ["user_id"],
      references: () => [usuarios.columns.user_id],
    },
  ],
});

// LogsAdmin
const logsAdmin = defineTable({
  columns: {
    log_id: column.number({ primaryKey: true, autoIncrement: true }),
    admin_id: column.number(),
    action: column.text(),
    project_id: column.number({ optional: true }),
    user_id: column.number({ optional: true }),
    timestamp: column.date({ default: NOW })
  },
  foreignKeys: [
    {
      columns: ["admin_id"],
      references: () => [usuarios.columns.user_id],
    },
    {
      columns: ["project_id"],
      references: () => [proyectos.columns.project_id],
    },
    {
      columns: ["user_id"],
      references: () => [usuarios.columns.user_id],
    },
  ],
});

// LogsProyecto
const logsProyecto = defineTable({
  columns: {
    log_id: column.number({ primaryKey: true, autoIncrement: true }),
    user_id: column.number(),
    project_id: column.number(),
    action: column.text(),
    date: column.date({ default: NOW })
  },
  foreignKeys: [
    {
      columns: ["user_id"],
      references: () => [usuarios.columns.user_id],
    },
    {
      columns: ["project_id"],
      references: () => [proyectos.columns.project_id],
    },
  ],
});

// TextoProyecto
const textoProyecto = defineTable({
  columns: {
    text_id: column.number({ primaryKey: true, autoIncrement: true }),
    project_id: column.number(),
    user_id: column.number(),
    content: column.text()
  },
  foreignKeys: [
    {
      columns: ["project_id"],
      references: () => [proyectos.columns.project_id],
    },
    {
      columns: ["user_id"],
      references: () => [usuarios.columns.user_id],
    },
  ],
});

// VideosProyecto
const videosProyecto = defineTable({
  columns: {
    video_id: column.number({ primaryKey: true, autoIncrement: true }),
    project_id: column.number(),
    user_id: column.number(),
    content: column.text()
  },
  foreignKeys: [
    {
      columns: ["project_id"],
      references: () => [proyectos.columns.project_id],
    },
    {
      columns: ["user_id"],
      references: () => [usuarios.columns.user_id],
    },
  ],
});
// LinksProyecto
const linksProyecto = defineTable({
  columns: {
    link_id: column.number({ primaryKey: true, autoIncrement: true }),
    project_id: column.number(),
    user_id: column.number(),
    content: column.text()
  },
  foreignKeys: [
    {
      columns: ["project_id"],
      references: () => [proyectos.columns.project_id],
    },
    {
      columns: ["user_id"],
      references: () => [usuarios.columns.user_id],
    },
  ],
});

// ImagenesProyecto
const imagenesProyecto = defineTable({
  columns: {
    image_id: column.number({ primaryKey: true, autoIncrement: true }),
    project_id: column.number(),
    user_id: column.number(),
    content: column.text()
  },
  foreignKeys: [
    {
      columns: ["project_id"],
      references: () => [proyectos.columns.project_id],
    },
    {
      columns: ["user_id"],
      references: () => [usuarios.columns.user_id],
    },
  ],
});

export default defineDb({
  tables: { usuarios, proyectos, rolesProyecto, logsBajas, logsEliminados, logsAdmin, logsProyecto, textoProyecto, videosProyecto, linksProyecto, imagenesProyecto }
});