import { sql } from "../db/client.js";

export async function listUsers() {
  return sql`
    SELECT id, name, email, created_at
    FROM users
    ORDER BY id
  `;
}

export async function getUserById(id: number) {
  const rows = await sql`
    SELECT id, name, email, created_at
    FROM users
    WHERE id = ${id}
  `;
  return rows[0] ?? null;
}

export async function createUser(name: string, email: string, password: string) {
  const rows = await sql`
    INSERT INTO users (name, email, password)
    VALUES (${name}, ${email}, ${password})
    RETURNING id, name, email, created_at
  `;
  return rows[0];
}
