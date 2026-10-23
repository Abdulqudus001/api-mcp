import { Router } from "express";
import { getProductById, listProducts, searchProducts } from "../services/products.js";

const router = Router();

router.get("/", async (req, res) => {
  const query = typeof req.query.q === "string" ? req.query.q : undefined;
  const products = query ? await searchProducts(query) : await listProducts();
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

export default router;
