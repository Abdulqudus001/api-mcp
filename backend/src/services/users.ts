import { getDb, nextId } from "../db/client.js";

function withoutPassword<T extends { password: string }>(user: T) {
  const { password: _password, ...publicUser } = user;
  return publicUser;
}

export async function listUsers() {
  const db = await getDb();
  return db.data.users
    .slice()
    .sort((a, b) => a.id - b.id)
    .map(withoutPassword);
}

export async function getUserById(id: number) {
  const db = await getDb();
  const user = db.data.users.find((u) => u.id === id);
  return user ? withoutPassword(user) : null;
}

export async function createUser(name: string, email: string, password: string) {
  const db = await getDb();
  const user = {
    id: nextId(db.data.users),
    name,
    email,
    password,
    created_at: new Date().toISOString(),
  };

  db.data.users.push(user);
  await db.write();

  return withoutPassword(user);
}
