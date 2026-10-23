import "dotenv/config";
import cors from "cors";
import express from "express";
import orderRoutes from "./routes/orders.js";
import productRoutes from "./routes/products.js";
import userRoutes from "./routes/users.js";

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    name: "api-mcp",
    event: "DevFest Maiduguri",
    message: "DevFest Maiduguri API is running",
    endpoints: [
      "GET /users",
      "GET /users/without-products",
      "GET /users/expired",
      "GET /users/expired?before=2026-01-01",
      "GET /users/:id",
      "GET /users/:id/products",
      "GET /products",
      "GET /products?q=keyboard",
      "GET /products/:id",
      "GET /orders",
      "GET /orders/user/:userId",
    ],
  });
});

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.listen(port, () => {
  console.log(`api-mcp running at http://localhost:${port}`);
});
