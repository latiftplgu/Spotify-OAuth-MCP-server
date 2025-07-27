#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { SpotifyService } from "../spotify";
import { ToolRegistrar } from "./tools/index";
import { zodToJsonSchema } from "./helpers/utils";

const spotifyService = new SpotifyService();
const toolRegistrar = new ToolRegistrar(spotifyService);

const server = new Server(
  {
    name: "spotify-mcp-service",
    version: "1.0.3",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  const tools: any[] = [];
  const toolNames = toolRegistrar.getToolNames();

  for (const toolName of toolNames) {
    const tool = toolRegistrar.getTool(toolName);
    if (tool) {
      const jsonSchema = zodToJsonSchema(tool.schema);
      tools.push({
        name: toolName,
        description: tool.description,
        inputSchema: jsonSchema,
      });
    }
  }

  return {
    tools,
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    const toolHandler = toolRegistrar.createToolHandler(name);
    const result = await toolHandler(args || {});

    return {
      content: [
        {
          type: "text",
          text:
            typeof result === "string"
              ? result
              : JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error executing tool '${name}': ${
            error instanceof Error ? error.message : String(error)
          }`,
        },
      ],
      isError: true,
    };
  }
});

async function main(): Promise<void> {
  try {
    const transport = new StdioServerTransport();
    console.error("🎵 Spotify MCP Server starting...");
    console.error("Working directory:", process.cwd());

    const totalTools = toolRegistrar.getToolNames().length;
    console.error(`📊 Total tools available: ${totalTools}`);

    await server.connect(transport);
    console.error("🎵 Spotify MCP Server successfully started and connected.");

    process.on("SIGINT", async () => {
      console.error("🛑 Spotify MCP Server shutting down...");
      await server.close();
      console.error("✅ Spotify MCP Server closed.");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Failed to start Spotify MCP Server:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("❌ Failed to start Spotify MCP Server:", error);
  process.exit(1);
});
