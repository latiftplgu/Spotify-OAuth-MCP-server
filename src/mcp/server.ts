#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SpotifyService } from "../spotify.js";
import { ToolRegistrar, toolCategories } from "./tools/index.js";
import { z } from "zod";
const spotifyService = new SpotifyService();
const toolRegistrar = new ToolRegistrar(spotifyService);
const server = new McpServer(
  {
    name: "spotify-mcp-service",
    version: "1.0.2",
  },
  {
    capabilities: {
      tools: {
        get_user_profile: {
          title: "Get User Profile",
          description: "Get the current user's profile information",
          handler: async (args: any) => {
            const user = await spotifyService.getUserProfile(args.token);
            return user;
          },
          prompt: "Get the current user's profile information",
          inputSchema: z.object({
            token: z.string(),
          }),
        },
      },
    },
  }
);

async function registerAllTools(): Promise<void> {
  try {
    const toolHandlers = toolRegistrar.getToolHandlers();
    const toolNames = toolRegistrar.getToolNames();

    for (const toolName of toolNames) {
      const tool = toolRegistrar.getTool(toolName);
      if (!tool) {
        console.error(`Warning: Tool definition not found for '${toolName}'`);
        continue;
      }

      const handler = toolHandlers[toolName];
      if (!handler) {
        console.error(`Warning: No handler found for tool '${toolName}'`);
        continue;
      }

      await server.registerTool(
        toolName,
        {
          title: tool.title,
          description: tool.description,
          inputSchema: tool.schema as any,
        },
        handler
      );

      console.error(`✓ Registered tool: ${toolName}`);
    }

    console.error("\n📊 Tools organized by category:");
    for (const [category, tools] of Object.entries(toolCategories)) {
      console.error(`  ${category}: ${tools.length} tools`);
    }
  } catch (error) {
    console.error("❌ Failed to register tools:", error);
  }
}

async function main(): Promise<void> {
  try {
    const transport = new StdioServerTransport();
    console.error("🎵 Spotify MCP Server starting...");
    console.error("Working directory:", process.cwd());

    await registerAllTools();

    const totalTools = toolRegistrar.getToolNames().length;
    console.error(`📊 Total tools registered: ${totalTools}`);

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
