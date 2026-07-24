import { Router } from "express";
import { listUsers, getUserById, createUser } from "../services/users.js";

const router = Router();

router.get("/", async (_req, res) => {
  const users = await listUsers();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await getUserById(Number(req.params.id));

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(user);
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await createUser(name, email, password);
  res.status(201).json(user);
});

export default router;
