# api-mcp

DevFest Maiduguri workshop API for demonstrating MCP tools. It is a small Express API plus an MCP server that exposes those routes as tools.

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or later

## Setup

From the `backend` directory:

```bash
cd backend
npm install
cp .env.example .env
```

`.env` controls the ports:

```
PORT=8000
MCP_PORT=8081
```

Sample users, products, and orders are already in `backend/data/db.json`. To reset that file back to the seed data:

```bash
npm run db:init
```

## Run the servers

Use two terminals, both in `backend`.

Start the HTTP API:

```bash
npm run dev
```

It serves `http://localhost:8000`. Open that URL to see the available routes.

Start the MCP server:

```bash
npm run mcp
```

It serves `http://localhost:8081/mcp`.

## Connect an MCP client

Start the MCP server first, then add this server in your client.

Cursor (`.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "api-mcp": {
      "url": "http://localhost:8081/mcp"
    }
  }
}
```

VS Code (`.vscode/mcp.json`):

```json
{
  "servers": {
    "api-mcp": {
      "type": "http",
      "url": "http://localhost:8081/mcp"
    }
  }
}
```

Only `get_users` is enabled when you clone the repo. The other tools are commented out in `backend/src/mcp.ts`. Uncomment a tool, save the file, and restart `npm run mcp` to show it in the demo.
