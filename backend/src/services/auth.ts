import { getDb } from "../db/client.js";

export async function login(email: string, password: string) {
  const db = await getDb();
  const user = db.data.users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return null;
  }

  const { password: _password, ...publicUser } = user;
  return publicUser;
}
