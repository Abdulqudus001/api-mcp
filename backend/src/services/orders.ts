import { getDb } from "../db/client.js";

export async function listOrders() {
  const db = await getDb();

  return db.data.orders
    .slice()
    .sort((a, b) => a.id - b.id)
    .map((order) => {
      const user = db.data.users.find((item) => item.id === order.user_id);
      const product = db.data.products.find((item) => item.id === order.product_id);

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
      const product = db.data.products.find((item) => item.id === order.product_id);

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

export async function listProductsForUser(userId: number) {
  const db = await getDb();
  const user = db.data.users.find((item) => item.id === userId);
  if (!user) return null;

  return db.data.orders
    .filter((order) => order.user_id === userId)
    .sort((a, b) => a.id - b.id)
    .flatMap((order) => {
      const product = db.data.products.find((item) => item.id === order.product_id);
      if (!product) return [];

      return [
        {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: order.quantity,
        },
      ];
    });
}
