import { Router } from "express";
import { listProductsForUser } from "../services/orders.js";
import {
  expiryCutoff,
  getUserById,
  listExpiredUsers,
  listUsers,
  listUsersWithoutProducts,
} from "../services/users.js";

const router = Router();

router.get("/", async (_req, res) => {
  res.json(await listUsers());
});

router.get("/without-products", async (_req, res) => {
  res.json(await listUsersWithoutProducts());
});

router.get("/expired", async (req, res) => {
  const before = typeof req.query.before === "string" ? req.query.before : undefined;
  const cutoff = expiryCutoff(before);

  if (!cutoff) {
    res.status(400).json({
      error: "Invalid date. Use an ISO date such as 2026-01-01.",
    });
    return;
  }

  res.json(await listExpiredUsers(cutoff));
});

router.get("/:id/products", async (req, res) => {
  const products = await listProductsForUser(Number(req.params.id));

  if (!products) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(products);
});

router.get("/:id", async (req, res) => {
  const user = await getUserById(Number(req.params.id));

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(user);
});

export default router;
