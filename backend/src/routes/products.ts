import { Router } from "express";
import {
  listProducts,
  getProductById,
  createProduct,
  searchProducts,
} from "../services/products.js";

const router = Router();

router.get("/", async (req, res) => {
  const q = req.query.q as string | undefined;
  const products = q ? await searchProducts(q) : await listProducts();
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await getProductById(Number(req.params.id));

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(product);
});

router.post("/", async (req, res) => {
  const { name, description, price, stock } = req.body;
  const product = await createProduct(name, description, price, stock);
  res.status(201).json(product);
});

export default router;
