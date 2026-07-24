import { sql } from "../db/client.js";

export async function login(email: string, password: string) {
  const rows = await sql`
    SELECT id, name, email, created_at
    FROM users
    WHERE email = ${email} AND password = ${password}
  `;
  return rows[0] ?? null;
}
