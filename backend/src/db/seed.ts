export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  created_at: string;
};

export type Order = {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  created_at: string;
};

export type DbSchema = {
  users: User[];
  products: Product[];
  orders: Order[];
};

const createdAt = "2026-01-01T00:00:00.000Z";

export const seedData: DbSchema = {
  users: [
    {
      id: 1,
      name: "Ada Lovelace",
      email: "ada@example.com",
      password: "password123",
      created_at: createdAt,
    },
    {
      id: 2,
      name: "Alan Turing",
      email: "alan@example.com",
      password: "password123",
      created_at: createdAt,
    },
    {
      id: 3,
      name: "Grace Hopper",
      email: "grace@example.com",
      password: "password123",
      created_at: createdAt,
    },
  ],
  products: [
    {
      id: 1,
      name: "Mechanical Keyboard",
      description: "Clicky keys for focused coding",
      price: 129.99,
      stock: 25,
      created_at: createdAt,
    },
    {
      id: 2,
      name: "USB-C Hub",
      description: "7-in-1 hub for laptops",
      price: 49.99,
      stock: 40,
      created_at: createdAt,
    },
    {
      id: 3,
      name: "Notebook",
      description: "Dotted pages for workshop notes",
      price: 12.5,
      stock: 100,
      created_at: createdAt,
    },
    {
      id: 4,
      name: "Coffee Mug",
      description: "Fuel for long debugging sessions",
      price: 18,
      stock: 60,
      created_at: createdAt,
    },
  ],
  orders: [
    { id: 1, user_id: 1, product_id: 1, quantity: 1, created_at: createdAt },
    { id: 2, user_id: 1, product_id: 3, quantity: 2, created_at: createdAt },
    { id: 3, user_id: 2, product_id: 2, quantity: 1, created_at: createdAt },
    { id: 4, user_id: 3, product_id: 4, quantity: 1, created_at: createdAt },
  ],
};
