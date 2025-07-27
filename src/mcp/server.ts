#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SpotifyService } from "../spotify.js";
import { SPOTIFY_TOOLS, ToolDefinition } from "./tools-definitions.js";
import { z, ZodSchema } from "zod";

interface ToolHandler {
  (args: any): Promise<any>;
}

interface WrappedResponse {
  [x: string]: unknown;
  content: Array<{
    [x: string]: unknown;
    type: "text";
    text: string;
  }>;
  isError?: boolean;
}

const server = new McpServer(
  {
    name: "spotify-mcp-service",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: { ...SPOTIFY_TOOLS },
    },
  }
);

const spotifyService = new SpotifyService();

const TOOL_HANDLERS: Record<string, ToolHandler> = {
  get_album: async (args: any) => {
    const { token, albumId } = args;
    return await spotifyService.getAlbum(token, albumId);
  },
  get_new_releases: async (args: any) => {
    const { token, limit = 20, country } = args;
    return await spotifyService.getNewReleases(token, limit, country);
  },
  get_album_tracks: async (args: any) => {
    const { token, albumId, limit = 50 } = args;
    return await spotifyService.getAlbumTracks(token, albumId, limit);
  },
  search_albums: async (args: any) => {
    const { token, query, limit = 20 } = args;
    return await spotifyService.searchAlbums(token, query, limit);
  },
  get_artist: async (args: any) => {
    const { token, artistId } = args;
    return await spotifyService.getArtist(token, artistId);
  },
  get_artist_albums: async (args: any) => {
    const { token, artistId, albumType = "album", limit = 20 } = args;
    return await spotifyService.getArtistAlbums(
      token,
      artistId,
      albumType,
      limit
    );
  },
  get_related_artists: async (args: any) => {
    const { token, artistId } = args;
    return await spotifyService.getRelatedArtists(token, artistId);
  },
  get_artist_top_tracks: async (args: any) => {
    const { token, artistId, country = "US" } = args;
    return await spotifyService.getArtistTopTracks(token, artistId, country);
  },
  search_artists: async (args: any) => {
    const { token, query, limit = 20 } = args;
    return await spotifyService.searchArtists(token, query, limit);
  },
  get_liked_tracks: async (args: any) => {
    const { token, limit = 20, offset = 0 } = args;
    return await spotifyService.getLikedTracks(token, limit, offset);
  },
  save_tracks: async (args: any) => {
    const { token, trackIds } = args;
    return await spotifyService.saveTracks(token, trackIds);
  },
  remove_tracks: async (args: any) => {
    const { token, trackIds } = args;
    return await spotifyService.removeTracks(token, trackIds);
  },
  get_followed_artists: async (args: any) => {
    const { token, limit = 20 } = args;
    return await spotifyService.getFollowedArtists(token, limit);
  },
  get_user_profile: async (args: any) => {
    const { token } = args;
    return await spotifyService.getUserProfile(token);
  },
  get_top_tracks: async (args: any) => {
    const { token, timeRange = "medium_term", limit = 20 } = args;
    return await spotifyService.getTopTracks(token, timeRange, limit);
  },
  get_top_artists: async (args: any) => {
    const { token, timeRange = "medium_term", limit = 20 } = args;
    return await spotifyService.getTopArtists(token, timeRange, limit);
  },
  add_to_queue: async (args: any) => {
    const { token, trackUri, deviceId } = args;
    return await spotifyService.addToQueue(token, trackUri, deviceId);
  },
  get_currently_playing: async (args: any) => {
    const { token } = args;
    return await spotifyService.getCurrentPlayback(token);
  },
  skip_to_next: async (args: any) => {
    const { token, deviceId } = args;
    return await spotifyService.skipToNext(token, deviceId);
  },
  pause_player: async (args: any) => {
    const { token, deviceId } = args;
    return await spotifyService.pausePlayback(token, deviceId);
  },
  skip_to_previous: async (args: any) => {
    const { token, deviceId } = args;
    return await spotifyService.skipToPrevious(token, deviceId);
  },
  get_recently_played: async (args: any) => {
    const { token, limit = 20 } = args;
    return await spotifyService.getRecentlyPlayed(token, limit);
  },
  resume_player: async (args: any) => {
    const { token, contextUri, trackUris, deviceId } = args;
    return await spotifyService.resumePlayback(
      token,
      contextUri,
      trackUris,
      deviceId
    );
  },
  set_volume: async (args: any) => {
    const { token, volumePercent, deviceId } = args;
    return await spotifyService.setVolume(token, volumePercent, deviceId);
  },
  start_playback: async (args: any) => {
    const { token, contextUri, trackUris, deviceId } = args;
    return await spotifyService.playMusic(
      token,
      trackUris,
      contextUri,
      deviceId
    );
  },
  add_to_playlist: async (args: any) => {
    const { token, playlistId, trackUris } = args;
    return await spotifyService.addTracksToPlaylist(
      token,
      playlistId,
      trackUris
    );
  },
  create_playlist: async (args: any) => {
    const { token, name, description = "", isPublic = true } = args;
    return await spotifyService.createPlaylist(
      token,
      name,
      description,
      isPublic
    );
  },
  get_playlist: async (args: any) => {
    const { token, playlistId } = args;
    return await spotifyService.getPlaylist(token, playlistId);
  },
  get_user_playlists: async (args: any) => {
    const { token, limit = 20 } = args;
    return await spotifyService.getUserPlaylists(token, limit);
  },
  get_playlist_tracks: async (args: any) => {
    const { token, playlistId, limit = 50 } = args;
    return await spotifyService.getPlaylistTracks(token, playlistId, limit);
  },
  remove_from_playlist: async (args: any) => {
    const { token, playlistId, trackUris } = args;
    return await spotifyService.removeTracksFromPlaylist(
      token,
      playlistId,
      trackUris
    );
  },
  search_playlists: async (args: any) => {
    const { token, query, limit = 20 } = args;
    return await spotifyService.searchPlaylists(token, query, limit);
  },
  get_track: async (args: any) => {
    const { token, trackId } = args;
    return await spotifyService.getTrack(token, trackId);
  },
  get_audio_features: async (args: any) => {
    const { token, trackId } = args;
    return await spotifyService.getAudioFeatures(token, trackId);
  },
  search_tracks: async (args: any) => {
    const { token, query, limit = 20 } = args;
    return await spotifyService.searchTracks(token, query, limit);
  },
  get_recommendations: async (args: any) => {
    const { token, seedTracks, seedArtists, seedGenres, limit = 20 } = args;
    const options: Record<string, any> = { limit };
    if (seedTracks) options.seed_tracks = seedTracks.join(",");
    if (seedArtists) options.seed_artists = seedArtists.join(",");
    if (seedGenres) options.seed_genres = seedGenres.join(",");
    return await spotifyService.getRecommendations(token, options);
  },
  get_featured_playlists: async (args: any) => {
    const { token, limit = 20, country } = args;
    return await spotifyService.getFeaturedPlaylists(token, limit, country);
  },
  get_categories: async (args: any) => {
    const { token, limit = 20, country } = args;
    return await spotifyService.getCategories(token, limit, country);
  },
  get_category_playlists: async (args: any) => {
    const { token, categoryId, limit = 20 } = args;
    return await spotifyService.getCategoryPlaylists(token, categoryId, limit);
  },
  get_devices: async (args: any) => {
    const { token } = args;
    return await spotifyService.getUserDevices(token);
  },
  transfer_playback: async (args: any) => {
    const { token, deviceId, play = false } = args;
    return await spotifyService.transferPlayback(token, deviceId, play);
  },
  search_music: async (args: any) => {
    const { token, query, type = "track", limit = 10 } = args;
    return await spotifyService.searchMusic(token, query, type, limit);
  },
  search_and_play_music: async (args: any) => {
    const { token, query } = args;
    const result = await spotifyService.searchMusic(token, query);
    if (result.tracks && result.tracks.items.length > 0) {
      const track_id = result.tracks.items[0].id;
      const playResult = await spotifyService.playMusic(token, track_id);
      return playResult;
    }
    throw new Error("No tracks found for the search query");
  },
};

async function wrapToolHandler(
  handler: ToolHandler
): Promise<(args: any) => Promise<WrappedResponse>> {
  return async (args: any): Promise<WrappedResponse> => {
    try {
      const result = await handler(args);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text",
            text: `Error: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
  };
}

async function registerAllTools(): Promise<void> {
  const toolEntries = Object.entries(SPOTIFY_TOOLS);

  for (const [toolName, toolDef] of toolEntries) {
    const handler = TOOL_HANDLERS[toolName];

    if (!handler) {
      console.error(`Warning: No handler found for tool '${toolName}'`);
      continue;
    }

    const zodSchema = createZodSchema(toolDef.inputSchema);
    const wrappedHandler = await wrapToolHandler(handler);

    server.registerTool(
      toolName,
      {
        description: toolDef.description,
        inputSchema: zodSchema as any,
      },
      wrappedHandler
    );

    console.error(`✓ Registered tool: ${toolName}`);
  }
}

function createZodSchema(jsonSchema: any): ZodSchema {
  const shape: Record<string, any> = {};

  if (jsonSchema.properties) {
    Object.entries(jsonSchema.properties).forEach(
      ([key, prop]: [string, any]) => {
        let zodType: any;

        switch (prop.type) {
          case "string":
            if (prop.enum && Array.isArray(prop.enum) && prop.enum.length > 0) {
              zodType = z.enum(prop.enum as [string, ...string[]]);
            } else {
              zodType = z.string();
            }
            if (prop.minLength && typeof zodType.min === "function") {
              zodType = zodType.min(prop.minLength);
            }
            if (prop.maxLength && typeof zodType.max === "function") {
              zodType = zodType.max(prop.maxLength);
            }
            break;
          case "number":
            zodType = z.number();
            if (prop.minimum !== undefined) zodType = zodType.min(prop.minimum);
            if (prop.maximum !== undefined) zodType = zodType.max(prop.maximum);
            break;
          case "boolean":
            zodType = z.boolean();
            break;
          case "array":
            if (prop.items?.type === "string") {
              zodType = z.array(z.string());
            } else {
              zodType = z.array(z.any());
            }
            break;
          default:
            zodType = z.any();
        }

        if (
          prop.description &&
          zodType &&
          typeof zodType.describe === "function"
        ) {
          zodType = zodType.describe(prop.description);
        }

        if (
          prop.default !== undefined &&
          zodType &&
          typeof zodType.default === "function"
        ) {
          zodType = zodType.default(prop.default);
        }

        const isRequired = jsonSchema.required?.includes(key);
        if (!isRequired && zodType && typeof zodType.optional === "function") {
          zodType = zodType.optional();
        }

        if (zodType) {
          shape[key] = zodType;
        }
      }
    );
  }

  return z.object(shape);
}

async function main(): Promise<void> {
  try {
    await registerAllTools();
    console.error(
      `📊 Total tools registered: ${Object.keys(SPOTIFY_TOOLS).length}`
    );

    const transport = new StdioServerTransport();
    console.error("🎵 Spotify MCP Server starting...");
    console.error("Working directory:", process.cwd());

    await server.connect(transport);
    console.error("🎵 Spotify MCP Server successfully started and connected.");

    console.error(
      `📊 Total tools registered: ${Object.keys(SPOTIFY_TOOLS).length}`
    );

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
