import { Router } from "express";
import {
  listOrders,
  getOrdersByUserId,
  createOrder,
} from "../services/orders.js";

const router = Router();

router.get("/", async (_req, res) => {
  const orders = await listOrders();
  res.json(orders);
});

router.get("/user/:userId", async (req, res) => {
  const orders = await getOrdersByUserId(Number(req.params.userId));
  res.json(orders);
});

router.post("/", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const order = await createOrder(userId, productId, quantity ?? 1);
  res.status(201).json(order);
});

export default router;
