import { getDb, nextId } from "../db/client.js";

export async function listProducts() {
  const db = await getDb();
  return db.data.products.slice().sort((a, b) => a.id - b.id);
}

export async function getProductById(id: number) {
  const db = await getDb();
  return db.data.products.find((p) => p.id === id) ?? null;
}

export async function createProduct(
  name: string,
  description: string,
  price: number,
  stock: number
) {
  const db = await getDb();
  const product = {
    id: nextId(db.data.products),
    name,
    description,
    price,
    stock,
    created_at: new Date().toISOString(),
  };

  db.data.products.push(product);
  await db.write();

  return product;
}

export async function searchProducts(query: string) {
  const db = await getDb();
  const needle = query.toLowerCase();

  return db.data.products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle)
    )
    .sort((a, b) => a.id - b.id);
}
