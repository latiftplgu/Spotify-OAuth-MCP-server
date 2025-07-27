import { z } from "zod";
import { SpotifyService } from "../../spotify";
import { albumTools } from "./albums";
import { artistTools } from "./artists";
import { trackTools } from "./tracks";
import { playlistTools } from "./playlists";
import { playbackTools } from "./playback";
import { userTools } from "./user";
import { searchTools } from "./search";

export interface ToolDefinition {
  title: string;
  description: string;
  schema: z.ZodObject<any>;
  handler: (args: any, spotifyService: SpotifyService) => Promise<any>;
}

export interface ToolsRegistry {
  [key: string]: ToolDefinition;
}

export const allTools: ToolsRegistry = {
  ...albumTools,

  ...artistTools,

  ...trackTools,

  ...playlistTools,

  ...playbackTools,

  ...userTools,

  ...searchTools,
};

export class ToolRegistrar {
  private tools: ToolsRegistry;
  private spotifyService: SpotifyService;

  constructor(spotifyService: SpotifyService) {
    this.tools = allTools;
    this.spotifyService = spotifyService;
  }

  getAllTools(): ToolsRegistry {
    return this.tools;
  }

  getTool(name: string): ToolDefinition | undefined {
    return this.tools[name];
  }

  getToolNames(): string[] {
    return Object.keys(this.tools);
  }

  createMcpToolDefinition(name: string, tool: ToolDefinition) {
    return {
      name,
      title: tool.title,
      description: tool.description,
      inputSchema: tool.schema as any,
    };
  }

  createToolHandler(name: string): (args: any) => Promise<any> {
    const tool = this.tools[name];
    if (!tool) {
      throw new Error(`Tool '${name}' not found`);
    }

    return async (args: any) => {
      try {
        const validatedArgs = tool.schema.parse(args);
        return await tool.handler(validatedArgs, this.spotifyService);
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new Error(
            `Invalid arguments for tool '${name}': ${error.message}`
          );
        }
        throw error;
      }
    };
  }

  getMcpToolDefinitions() {
    const definitions: Record<string, any> = {};
    for (const [name, tool] of Object.entries(this.tools)) {
      definitions[name] = this.createMcpToolDefinition(name, tool);
    }
    return definitions;
  }

  getToolHandlers() {
    const handlers: Record<string, (args: any) => Promise<any>> = {};
    for (const name of Object.keys(this.tools)) {
      handlers[name] = this.createToolHandler(name);
    }
    return handlers;
  }
}

export const toolCategories = {
  albums: Object.keys(albumTools),
  artists: Object.keys(artistTools),
  tracks: Object.keys(trackTools),
  playlists: Object.keys(playlistTools),
  playback: Object.keys(playbackTools),
  user: Object.keys(userTools),
  search: Object.keys(searchTools),
};

export {
  albumTools,
  artistTools,
  trackTools,
  playlistTools,
  playbackTools,
  userTools,
  searchTools,
};
