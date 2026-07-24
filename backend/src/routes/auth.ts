import { Router } from "express";
import { login } from "../services/auth.js";

const router = Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await login(email, password);

  if (!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  res.json({ message: "Logged in", user });
});

export default router;
