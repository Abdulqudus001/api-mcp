import { getDb } from "./client.js";
import { seedData } from "./seed.js";

async function init() {
  const db = await getDb();
  db.data = structuredClone(seedData);
  await db.write();
  console.log("Database ready. Seed data written to data/db.json.");
}

init().catch((err) => {
  console.error("Failed to init database:", err);
  process.exit(1);
});
