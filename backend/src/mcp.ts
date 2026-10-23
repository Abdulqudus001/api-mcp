import "dotenv/config";
import { FastMCP } from "fastmcp";
import { z } from "zod";
import { listProductsForUser } from "./services/orders.js";
import { listProducts, searchProducts } from "./services/products.js";
import {
  expiryCutoff,
  getUserById,
  listExpiredUsers,
  listUsers,
  listUsersWithoutProducts,
} from "./services/users.js";

// Create the MCP server. The name and version are what the AI client displays.
const server = new FastMCP({
  name: "api-mcp",
  version: "1.0.0",
});

function json(value: unknown) {
  return JSON.stringify(value);
}

// Register a tool the model can call, the same way you would expose an API route.
// The other tools below are commented out so the demo starts with just this one.
server.addTool({
  // Machine name the model uses when it decides to call the tool.
  name: "get_users",
  // Tells the model what the tool does and when it should use it.
  description: "List every user, including when their access expires",
  // Zod schema for the arguments. This tool takes none, so the object is empty.
  // Add a field here when the tool needs input, for example: id: z.number().
  parameters: z.object({}),
  // Runs only after Zod accepts the arguments.
  execute: async () => {
    const users = await listUsers();
    // Tool results are text. JSON is the easiest shape for the model to read.
    return json(users);
  },
});

/*
server.addTool({
  name: "get_user_without_products",
  description:
    "Get one user by id. Returns the profile only and does not include that user's products.",
  parameters: z.object({
    id: z.number().describe("User id"),
  }),
  execute: async ({ id }) => {
    const user = await getUserById(id);
    if (!user) return json({ error: "User not found" });
    return json(user);
  },
});

server.addTool({
  name: "get_users_without_products",
  description: "List users who have not ordered any products",
  parameters: z.object({}),
  execute: async () => json(await listUsersWithoutProducts()),
});

server.addTool({
  name: "get_expired_users",
  description:
    "List users whose access expired on or before a date. Omit the date to use the current time.",
  parameters: z.object({
    before: z
      .string()
      .optional()
      .describe("ISO date such as 2026-01-01. Users who expired on or before this date."),
  }),
  execute: async ({ before }) => {
    const cutoff = expiryCutoff(before);
    if (!cutoff) {
      return json({ error: "Invalid date. Use an ISO date such as 2026-01-01." });
    }

    return json(await listExpiredUsers(cutoff));
  },
});

server.addTool({
  name: "get_user_products",
  description: "List the products a specific user has ordered",
  parameters: z.object({
    id: z.number().describe("User id"),
  }),
  execute: async ({ id }) => {
    const products = await listProductsForUser(id);
    if (!products) return json({ error: "User not found" });
    return json(products);
  },
});

server.addTool({
  name: "list_products",
  description: "List all products, or search by name or description when a query is provided",
  parameters: z.object({
    q: z.string().optional().describe("Optional search text"),
  }),
  execute: async ({ q }) => json(q ? await searchProducts(q) : await listProducts()),
});
*/

// Start listening for MCP messages from the client.
server.start({
  transportType: "httpStream",
  httpStream: {
    port: Number(process.env.MCP_PORT) || 8081,
    stateless: true,
    enableJsonResponse: true,
  },
});
