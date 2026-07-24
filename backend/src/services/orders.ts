import { getDb, nextId } from "../db/client.js";

export async function listOrders() {
  const db = await getDb();

  return db.data.orders
    .slice()
    .sort((a, b) => a.id - b.id)
    .map((order) => {
      const user = db.data.users.find((u) => u.id === order.user_id);
      const product = db.data.products.find((p) => p.id === order.product_id);

      return {
        id: order.id,
        quantity: order.quantity,
        created_at: order.created_at,
        user_id: user?.id,
        user_name: user?.name,
        product_id: product?.id,
        product_name: product?.name,
        product_price: product?.price,
      };
    });
}

export async function getOrdersByUserId(userId: number) {
  const db = await getDb();

  return db.data.orders
    .filter((order) => order.user_id === userId)
    .sort((a, b) => a.id - b.id)
    .map((order) => {
      const product = db.data.products.find((p) => p.id === order.product_id);

      return {
        id: order.id,
        quantity: order.quantity,
        created_at: order.created_at,
        product_id: product?.id,
        product_name: product?.name,
        product_price: product?.price,
      };
    });
}

export async function createOrder(
  userId: number,
  productId: number,
  quantity: number
) {
  const db = await getDb();
  const order = {
    id: nextId(db.data.orders),
    user_id: userId,
    product_id: productId,
    quantity,
    created_at: new Date().toISOString(),
  };

  db.data.orders.push(order);
  await db.write();

  return order;
}
