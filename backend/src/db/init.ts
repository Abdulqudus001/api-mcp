import { sql } from "./client.js";

async function init() {
  // Fresh start for the workshop demo
  await sql`DROP TABLE IF EXISTS orders CASCADE`;
  await sql`DROP TABLE IF EXISTS products CASCADE`;
  await sql`DROP TABLE IF EXISTS users CASCADE`;

  await sql`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price NUMERIC(10, 2) NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id),
      product_id INTEGER NOT NULL REFERENCES products(id),
      quantity INTEGER NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    INSERT INTO users (name, email, password) VALUES
      ('Ada Lovelace', 'ada@example.com', 'password123'),
      ('Alan Turing', 'alan@example.com', 'password123'),
      ('Grace Hopper', 'grace@example.com', 'password123')
  `;

  await sql`
    INSERT INTO products (name, description, price, stock) VALUES
      ('Mechanical Keyboard', 'Clicky keys for focused coding', 129.99, 25),
      ('USB-C Hub', '7-in-1 hub for laptops', 49.99, 40),
      ('Notebook', 'Dotted pages for workshop notes', 12.50, 100),
      ('Coffee Mug', 'Fuel for long debugging sessions', 18.00, 60)
  `;

  await sql`
    INSERT INTO orders (user_id, product_id, quantity) VALUES
      (1, 1, 1),
      (1, 3, 2),
      (2, 2, 1),
      (3, 4, 1)
  `;

  console.log("Database ready. Tables created and seeded.");
}

init().catch((err) => {
  console.error("Failed to init database:", err);
  process.exit(1);
});
