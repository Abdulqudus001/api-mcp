import { Router } from "express";
import { getOrdersByUserId, listOrders } from "../services/orders.js";

const router = Router();

router.get("/", async (_req, res) => {
  res.json(await listOrders());
});

router.get("/user/:userId", async (req, res) => {
  res.json(await getOrdersByUserId(Number(req.params.userId)));
});

export default router;
