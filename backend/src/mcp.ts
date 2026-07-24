// Load DATABASE_URL and other vars from the .env file
import "dotenv/config";

// FastMCP = framework for building an MCP server
import { FastMCP } from "fastmcp";

// Zod = defines and validates the shape of tool arguments
import { z } from "zod";

// Reuse the same login logic as the Express POST /login route
import { login } from "./services/auth.js";

// Create the MCP server (name/version are shown to the AI client)
const server = new FastMCP({
  name: "Workshop API", // Identity of this server in the MCP client
  version: "1.0.0", // Server version string
});

// Register a tool the AI can call (similar to exposing an API endpoint)
server.addTool({
  name: "login", // Machine name the model invokes
  description: "Log in a user with email and password", // Tells the model when to use this tool
  parameters: z.object({
    // Input contract: both fields are required strings
    email: z.string().describe("User email address"), // .describe() helps the model fill this field
    password: z.string().describe("User password"),
  }),
  // Runs only after Zod validates the arguments
  execute: async (args) => {
    // Call shared business logic (same function Express uses)
    const user = await login(args.email, args.password);

    // No matching user → return an error as text for the model to read
    if (!user) {
      return JSON.stringify({ error: "Invalid email or password" });
    }

    // Success → return JSON as a string (typical MCP tool result format)
    return JSON.stringify({ message: "Logged in", user });
  },
});

// Start listening for MCP messages from the client
// server.start({
//   transportType: "stdio", // stdin/stdout — used by local clients like Cursor
// });


// server.start({
//   transportType: "httpStream",
//   httpStream: {
//     port: 8080, // listen on 0.0.0.0 in production
//   },
// });