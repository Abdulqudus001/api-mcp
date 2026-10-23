import { getDb } from "../db/client.js";
import type { User } from "../db/seed.js";

function byId(a: User, b: User) {
  return a.id - b.id;
}

export function expiryCutoff(before?: string): Date | null {
  if (!before) return new Date();

  const cutoff = new Date(before);
  return Number.isNaN(cutoff.getTime()) ? null : cutoff;
}

export async function listUsers() {
  const db = await getDb();
  return db.data.users.slice().sort(byId);
}

export async function getUserById(id: number) {
  const db = await getDb();
  return db.data.users.find((user) => user.id === id) ?? null;
}

export async function listUsersWithoutProducts() {
  const db = await getDb();
  const usersWithProducts = new Set(db.data.orders.map((order) => order.user_id));

  return db.data.users
    .filter((user) => !usersWithProducts.has(user.id))
    .sort(byId);
}

export async function listExpiredUsers(before: Date) {
  const db = await getDb();
  const cutoff = before.getTime();

  return db.data.users
    .filter((user) => Date.parse(user.expires_at) <= cutoff)
    .sort(byId);
}
