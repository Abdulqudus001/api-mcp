import { sql } from "../db/client.js";

export async function listProducts() {
  return sql`
    SELECT id, name, description, price, stock, created_at
    FROM products
    ORDER BY id
  `;
}

export async function getProductById(id: number) {
  const rows = await sql`
    SELECT id, name, description, price, stock, created_at
    FROM products
    WHERE id = ${id}
  `;
  return rows[0] ?? null;
}

export async function createProduct(
  name: string,
  description: string,
  price: number,
  stock: number
) {
  const rows = await sql`
    INSERT INTO products (name, description, price, stock)
    VALUES (${name}, ${description}, ${price}, ${stock})
    RETURNING id, name, description, price, stock, created_at
  `;
  return rows[0];
}

export async function searchProducts(query: string) {
  const pattern = `%${query}%`;
  return sql`
    SELECT id, name, description, price, stock, created_at
    FROM products
    WHERE name ILIKE ${pattern} OR description ILIKE ${pattern}
    ORDER BY id
  `;
}
