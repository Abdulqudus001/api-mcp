import { sql } from "../db/client.js";

export async function listOrders() {
  return sql`
    SELECT
      o.id,
      o.quantity,
      o.created_at,
      u.id AS user_id,
      u.name AS user_name,
      p.id AS product_id,
      p.name AS product_name,
      p.price AS product_price
    FROM orders o
    JOIN users u ON u.id = o.user_id
    JOIN products p ON p.id = o.product_id
    ORDER BY o.id
  `;
}

export async function getOrdersByUserId(userId: number) {
  return sql`
    SELECT
      o.id,
      o.quantity,
      o.created_at,
      p.id AS product_id,
      p.name AS product_name,
      p.price AS product_price
    FROM orders o
    JOIN products p ON p.id = o.product_id
    WHERE o.user_id = ${userId}
    ORDER BY o.id
  `;
}

export async function createOrder(userId: number, productId: number, quantity: number) {
  const rows = await sql`
    INSERT INTO orders (user_id, product_id, quantity)
    VALUES (${userId}, ${productId}, ${quantity})
    RETURNING id, user_id, product_id, quantity, created_at
  `;
  return rows[0];
}
