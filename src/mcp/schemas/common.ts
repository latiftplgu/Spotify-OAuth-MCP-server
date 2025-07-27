import { z } from "zod";

export const commonSchemas = {
  token: () => z.string().describe("Spotify access token for authentication"),

  limit: (min = 1, max = 50, defaultValue = 20) =>
    z
      .number()
      .min(min)
      .max(max)
      .default(defaultValue)
      .describe(`Number of items to return (${min}-${max})`),

  offset: (defaultValue = 0) =>
    z.number().min(0).default(defaultValue).describe("Offset for pagination"),

  country: () =>
    z
      .string()
      .length(2)
      .describe("Country code for localized content (e.g., 'US', 'GB')")
      .optional(),

  deviceId: () =>
    z
      .string()
      .describe(
        "Spotify device ID (optional, uses active device if not specified)"
      )
      .optional(),

  spotifyId: (type: string) => z.string().describe(`Spotify ${type} ID or URI`),

  trackUris: () => z.array(z.string()).describe("Array of Spotify track URIs"),

  timeRange: () =>
    z
      .enum(["short_term", "medium_term", "long_term"])
      .default("medium_term")
      .describe("Time range for data"),

  albumType: () =>
    z
      .enum(["album", "single", "appears_on", "compilation"])
      .default("album")
      .describe("Type of albums to include"),

  searchQuery: (context: string) =>
    z.string().describe(`Search query for ${context}`),

  searchType: () =>
    z
      .enum(["track", "album", "artist", "playlist"])
      .default("track")
      .describe("Type of content to search for"),

  volumePercent: () =>
    z.number().min(0).max(100).describe("Volume level as a percentage (0-100)"),

  seedArrays: () => ({
    seedTracks: z
      .array(z.string())
      .optional()
      .describe("Array of seed track IDs (up to 5)"),
    seedArtists: z
      .array(z.string())
      .optional()
      .describe("Array of seed artist IDs (up to 5)"),
    seedGenres: z
      .array(z.string())
      .optional()
      .describe("Array of seed genres (up to 5)"),
  }),
};

export const createSchema = (properties: Record<string, z.ZodType>) => {
  return z.object(properties);
};
