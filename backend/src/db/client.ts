import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSONFilePreset } from "lowdb/node";
import { seedData, type DbSchema } from "./seed.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const dbPath = path.join(__dirname, "../../data/db.json");

let dbPromise: ReturnType<typeof JSONFilePreset<DbSchema>> | null = null;

export async function getDb() {
  if (!dbPromise) {
    dbPromise = JSONFilePreset<DbSchema>(dbPath, seedData);
  }
  return dbPromise;
}

export function nextId(items: { id: number }[]): number {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

export type { DbSchema };
export type { User, Product, Order } from "./seed.js";
