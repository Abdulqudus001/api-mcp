import { getDb } from "../db/client.js";

export async function listProducts() {
  const db = await getDb();
  return db.data.products.slice().sort((a, b) => a.id - b.id);
}

export async function getProductById(id: number) {
  const db = await getDb();
  return db.data.products.find((product) => product.id === id) ?? null;
}

export async function searchProducts(query: string) {
  const db = await getDb();
  const needle = query.toLowerCase();

  return db.data.products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(needle) ||
        product.description.toLowerCase().includes(needle)
    )
    .sort((a, b) => a.id - b.id);
}
