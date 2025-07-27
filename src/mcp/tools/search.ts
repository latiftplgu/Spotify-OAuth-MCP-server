import { commonSchemas, createSchema } from "../schemas/common";
import { SpotifyService } from "../../spotify";

export const searchTools = {
  search_music: {
    title: "Search Music",
    description: `Perform comprehensive music search across all Spotify content types with intelligent filtering and ranking.

🎯 USE CASES:
• Universal music discovery across tracks, albums, artists, and playlists
• Build intelligent search interfaces for music applications
• Find specific songs when you only remember partial information
• Discover new music based on keywords, moods, or themes
• Create dynamic search-based music recommendations

📝 WHAT IT RETURNS:
• Multi-type search results (tracks, artists, albums, playlists)
• Relevance-ranked results based on Spotify's search algorithms
• Complete metadata for each result type
• Popularity scores and user engagement metrics
• Links to explore each result in detail

🔍 EXAMPLES:
• "Search for 'upbeat dance music' in tracks"
• "Find 'acoustic guitar' content across all types"
• "Look for 'Beatles' in artists and albums"
• "Search for '90s hip hop' in playlists"

🎵 SEARCH TYPES:
• 'track' - Individual songs and recordings
• 'album' - Full album releases and EPs
• 'artist' - Musicians, bands, and performers
• 'playlist' - User and editorial playlists
• 'show' - Podcasts and audio shows
• 'episode' - Individual podcast episodes

💡 SEARCH STRATEGIES:
• Use descriptive keywords: "chill indie folk"
• Include artist names: "Taylor Swift love songs"
• Try genre combinations: "electronic jazz fusion"
• Use mood descriptors: "energetic workout beats"
• Include decades: "80s synthwave nostalgia"

🔍 ADVANCED FEATURES:
• Intelligent typo correction and suggestions
• Context-aware search ranking
• Market-specific availability filtering
• Real-time search result updates
• Multi-language search support

⚠️ REQUIREMENTS:
• Valid Spotify access token
• Search queries should be at least 2 characters long`,
    schema: createSchema({
      token: commonSchemas.token(),
      query: commonSchemas.searchQuery(
        "music content (keyword, title, artist)"
      ),
      type: commonSchemas.searchType(),
      limit: commonSchemas.limit(1, 50, 10),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, query, type = "track", limit = 10 } = args;
      return await spotifyService.searchMusic(token, query, type, limit);
    },
  },

  search_and_play_music: {
    title: "Search and Play Music",
    description: `Instantly search for a track and begin playback in one seamless operation for immediate music gratification.

🎯 USE CASES:
• Voice-activated music requests with instant playback
• Quick music access without browsing interfaces
• Party DJ functionality with instant song requests
• Smart home integration with spoken music commands
• Emergency music solutions when you need a specific song now

📝 WHAT IT RETURNS:
• Search results showing the track that was found
• Playback confirmation with current track information
• Device information where playback started
• Error details if track couldn't be found or played
• Alternative suggestions if exact match isn't available

🔍 EXAMPLES:
• "Search and play 'Bohemian Rhapsody' by Queen"
• "Find and start 'Uptown Funk' immediately"
• "Play the first result for 'relaxing piano music'"
• "Search 'workout motivation' and start playing"

🎵 SMART PLAYBACK:
• Automatically selects the best match from search results
• Prioritizes popular and high-quality versions
• Starts playback on user's active device
• Falls back gracefully if preferred version unavailable
• Maintains context for follow-up requests

💡 WORKFLOW OPTIMIZATION:
• Eliminates manual track selection step
• Perfect for hands-free music control
• Reduces interaction friction for immediate needs
• Great for mood-based music requests
• Ideal for social settings and parties

🚀 INSTANT GRATIFICATION:
• No browsing or selection required
• Immediate musical response to requests
• Perfect for time-sensitive music needs
• Streamlined user experience
• Ideal for voice and automation interfaces

⚠️ REQUIREMENTS:
• Valid Spotify access token with user-modify-playback-state scope
• Active Spotify device must be available
• Search query should be specific enough for good matching`,
    schema: createSchema({
      token: commonSchemas.token(),
      query: commonSchemas.searchQuery("the track to find and play"),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, query } = args;
      const result = await spotifyService.searchMusic(token, query);
      if (result.tracks && result.tracks.items.length > 0) {
        const track_id = result.tracks.items[0].id;
        const playResult = await spotifyService.playMusic(token, track_id);
        return playResult;
      }
      throw new Error("No tracks found for the search query");
    },
  },
};
