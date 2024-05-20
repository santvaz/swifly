import { sql } from 'astro:db';

async function insertPermission(type: 'observer' | 'moderator' | 'admin', userId: string, projectId: string) {
    // verify permission type
    if (type !== 'observer' && type !== 'moderator' && type !== 'admin') {
      throw new Error('Tipo de permiso inválido.');
  
    }
  
    // insert new permission
    await sql `
      INSERT INTO Permissions (type, user_id, project_id) VALUES (${type}, ${userId}, ${projectId});
    `
}

async function insertCategory(type: 'to do' | 'doing' | 'done', userId: string, projectId: string) {
    // verify permission type
    if (type !== 'to do' && type !== 'doing' && type !== 'done') {
      throw new Error('Categoría de tarea inválida.');
  
    }
  
    // insert new permission
    await sql `
      INSERT INTO Categories (type, user_id, project_id) VALUES (${type}, ${userId}, ${projectId});
    `
}