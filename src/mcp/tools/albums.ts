import { commonSchemas, createSchema } from "../schemas/common.js";
import { SpotifyService } from "../../spotify.js";

export const albumTools = {
  get_album: {
    title: "Get Album",
    description: `Retrieve comprehensive information about a specific album from Spotify using its unique identifier.

🎯 USE CASES:
• Check album details before adding to playlist
• Get track listing for a specific album
• View album artwork, release date, and artist information
• Research album metadata for music discovery

📝 WHAT IT RETURNS:
• Album name, artists, and release date
• Complete track listing with durations
• Album artwork in multiple resolutions
• Spotify popularity metrics and genre information
• External URLs and market availability

🔍 EXAMPLES:
• "Get details for the album 'Abbey Road' by The Beatles"
• "Show me information about album ID: 1klALx0u4AavZNEvC4LrTL"
• "I need the track list for this album I found"

⚠️ REQUIREMENTS:
• Valid Spotify access token with appropriate scopes
• Album must exist and be available in user's market`,
    schema: createSchema({
      token: commonSchemas.token(),
      albumId: commonSchemas.spotifyId("album"),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, albumId } = args;
      return await spotifyService.getAlbum(token, albumId);
    },
  },

  get_new_releases: {
    title: "Get New Album Releases",
    description: `Discover the latest album releases available on Spotify, perfect for staying up-to-date with new music.

🎯 USE CASES:
• Weekly music discovery sessions
• Finding new releases from favorite genres
• Building "New Music Friday" playlists
• Keeping up with trending releases in specific regions
• Music blog content creation and curation

📝 WHAT IT RETURNS:
• Recently released albums with release dates
• Artist information and album artwork
• Spotify popularity scores and listener counts
• Genre classifications and market availability
• External links and preview URLs where available

🔍 EXAMPLES:
• "Show me the latest album releases this week"
• "What new albums came out in the UK recently?"
• "Find new releases, limit to 10 albums"
• "I want to discover new music that just dropped"

💡 TIPS:
• Use country parameter to get region-specific releases
• Adjust limit based on how many discoveries you want
• Perfect for automated weekly new music updates

⚠️ REQUIREMENTS:
• Valid Spotify access token
• Optional: Country code for region-specific results`,
    schema: createSchema({
      token: commonSchemas.token(),
      limit: commonSchemas.limit(1, 50, 20),
      country: commonSchemas.country(),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, limit = 20, country } = args;
      return await spotifyService.getNewReleases(token, limit, country);
    },
  },

  get_album_tracks: {
    title: "Get Album Tracks",
    description: `Retrieve the complete track listing for any album, including detailed information about each song.

🎯 USE CASES:
• Building custom playlists from favorite albums
• Checking track order and durations before purchase
• Creating "deep cuts" playlists from lesser-known album tracks
• Analyzing album structure and flow
• Finding specific tracks within concept albums or compilations

📝 WHAT IT RETURNS:
• Complete ordered track listing with track numbers
• Individual track durations and preview URLs
• Track popularity scores and explicit content flags
• Artist credits for each track (including featured artists)
• External IDs and market availability per track

🔍 EXAMPLES:
• "Get all tracks from 'Dark Side of the Moon' album"
• "Show me the tracklist for album ID: 4LH4d3cOWNNsVw41Gqt2kv"
• "I want to see all songs from this compilation album"
• "List the tracks from this soundtrack, limit to 20"

💡 TIPS:
• Use this before adding entire albums to playlists
• Great for discovering hidden gems in large albums
• Check explicit flags if building family-friendly playlists

⚠️ REQUIREMENTS:
• Valid Spotify access token
• Album must be available in user's market`,
    schema: createSchema({
      token: commonSchemas.token(),
      albumId: commonSchemas.spotifyId("album"),
      limit: commonSchemas.limit(1, 50, 50),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, albumId, limit = 50 } = args;
      return await spotifyService.getAlbumTracks(token, albumId, limit);
    },
  },

  search_albums: {
    title: "Search Albums",
    description: `Search for albums using flexible keywords, artist names, or album titles to discover music.

🎯 USE CASES:
• Finding albums when you only remember partial information
• Discovering discographies of new artists
• Searching for concept albums or themed collections
• Finding albums by genre, mood, or era
• Locating rare releases, deluxe editions, or remastered versions

📝 WHAT IT RETURNS:
• Ranked search results based on relevance
• Album names, artists, and release years
• Album artwork and Spotify popularity metrics
• Genre information and track counts
• External URLs and availability information

🔍 EXAMPLES:
• "Search for albums by 'Pink Floyd'"
• "Find albums with 'greatest hits' in the title"
• "Search for 'jazz piano' albums"
• "Look for albums containing 'live' or 'concert'"
• "Find albums released in '1969'"

💡 SEARCH TIPS:
• Use quotes for exact phrase matching: "Abbey Road"
• Combine artist and album names: "Beatles White Album"
• Use genre keywords: "progressive rock", "indie folk"
• Include year ranges: "1970s rock albums"
• Try alternate spellings or abbreviations

⚠️ REQUIREMENTS:
• Valid Spotify access token
• Search query with meaningful keywords`,
    schema: createSchema({
      token: commonSchemas.token(),
      query: commonSchemas.searchQuery("albums (album name, artist, keywords)"),
      limit: commonSchemas.limit(1, 50, 20),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, query, limit = 20 } = args;
      return await spotifyService.searchAlbums(token, query, limit);
    },
  },
};
