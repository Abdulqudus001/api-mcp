import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Workshop API is running",
    endpoints: [
      "POST /login",
      "GET /users",
      "GET /users/:id",
      "POST /users",
      "GET /products",
      "GET /products?q=keyboard",
      "GET /products/:id",
      "POST /products",
      "GET /orders",
      "GET /orders/user/:userId",
      "POST /orders",
    ],
  });
});

app.use("/login", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
