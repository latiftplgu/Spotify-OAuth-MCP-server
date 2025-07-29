import { commonSchemas, createSchema } from "../schemas/common";
import { SpotifyService } from "../../spotify";
import { z } from "zod";

export const trackTools = {
  get_track: {
    title: "Get Track",
    description: `Retrieve comprehensive information about any specific track including detailed metadata and audio characteristics.

🎯 USE CASES:
• Research song details for music blogs or articles
• Analyze track metadata for music applications
• Get complete song information for sharing or playlisting
• Verify track details and availability before use
• Build detailed music catalogs and databases

📝 WHAT IT RETURNS:
• Complete track information (title, artist, album, duration)
• Release date, popularity scores, and market availability
• Track artwork, preview URLs, and external links
• Explicit content flags and parental guidance information
• ISRC codes and other professional identifiers

🔍 EXAMPLES:
• "Get details for 'Hotel California' by Eagles"
• "Show me information about track ID: 40riOy7x9W7GXjyGp4pjAv"
• "I need complete details for this specific song"
• "Get metadata for the track I just discovered"

💡 DETAILED INSIGHTS:
• Professional music industry identifiers
• Cross-platform compatibility information
• Regional availability and licensing details
• Perfect for music research and analysis
• Essential for building music applications

⚠️ REQUIREMENTS:
• Valid Spotify access token
• Track must exist and be available in user's market`,
    schema: createSchema({
      token: commonSchemas.token(),
      trackId: commonSchemas.spotifyId("track"),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, trackId } = args;
      return await spotifyService.getTrack(token, trackId);
    },
  },

  search_tracks: {
    title: "Search Tracks",
    description: `Search specifically for individual tracks with targeted filtering for precise song discovery.

🎯 USE CASES:
• Find specific songs when you remember lyrics or melodies
• Discover tracks by particular artists or from specific albums
• Build track-focused music discovery experiences
• Find alternative versions, covers, or remixes of songs
• Research song catalogs and discographies

📝 WHAT IT RETURNS:
• Ranked track results based on search relevance
• Song titles, artists, albums, and release information
• Track popularity scores and listener engagement
• Preview URLs for instant track sampling
• Market availability and explicit content flags

🔍 EXAMPLES:
• "Search for tracks with 'love' in the title"
• "Find acoustic versions of popular songs"
• "Look for instrumental jazz piano tracks"
• "Search for covers of 'Yesterday' by The Beatles"

🎵 SEARCH PRECISION:
• Track-specific results without album/artist clutter
• Optimized for individual song discovery
• Better for finding specific recordings or versions
• Perfect for playlist building and curation
• Ideal for karaoke or cover song searches

💡 SEARCH STRATEGIES:
• Include specific lyrics: "lyrics hello darkness my old friend"
• Search by genre: "indie folk acoustic guitar"
• Find versions: "acoustic", "remix", "live", "cover"
• Use artist filters: "artist:Taylor Swift love songs"
• Include year ranges: "track:dancing year:2020-2023"

⚠️ REQUIREMENTS:
• Valid Spotify access token
• Search terms should be specific for best results`,
    schema: createSchema({
      token: commonSchemas.token(),
      query: commonSchemas.searchQuery(
        "tracks (song title, artist, album, keywords)"
      ),
      limit: commonSchemas.limit(1, 50, 20),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, query, limit = 20 } = args;
      return await spotifyService.searchTracks(token, query, limit);
    },
  },

  get_liked_tracks: {
    title: "Get Liked Tracks",
    description: `Access the user's personal collection of liked/saved tracks from their Spotify library.

🎯 USE CASES:
• Display user's favorite music collection in applications
• Create personalized playlists from liked songs
• Analyze personal music taste and preferences
• Build recommendation systems based on user favorites
• Export personal music library for backup or migration

📝 WHAT IT RETURNS:
• Complete collection of user's liked/saved tracks
• Track information with save dates and timestamps
• Artist, album, and release information for each track
• Chronological order of when tracks were liked
• Total count of saved tracks in library

🔍 EXAMPLES:
• "Show me my liked songs collection"
• "Get my 50 most recently liked tracks"
• "What songs have I saved to my library?"
• "Export my favorite tracks with save dates"

💖 PERSONAL COLLECTION:
• Reflects user's musical taste and preferences
• Shows evolution of music taste over time
• Perfect for building "greatest hits" playlists
• Useful for music discovery based on preferences
• Great for sharing favorite music with friends

💡 COLLECTION INSIGHTS:
• Track when musical tastes changed or evolved
• Identify patterns in saved music genres
• Use for personalized recommendation systems
• Perfect for "throwback" and nostalgia playlists
• Analyze your music journey over time

⚠️ REQUIREMENTS:
• Valid Spotify access token with user-library-read scope
• User must have saved tracks in their library`,
    schema: createSchema({
      token: commonSchemas.token(),
      limit: commonSchemas.limit(1, 50, 20),
      offset: commonSchemas.offset(),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, limit = 20, offset = 0 } = args;
      return await spotifyService.getLikedTracks(token, limit, offset);
    },
  },

  save_tracks: {
    title: "Save Tracks to Library",
    description: `Add tracks to the user's personal library, creating a permanent collection of favorite music.

🎯 USE CASES:
• Save discovered tracks for future listening
• Build personal music library from recommendations
• Like tracks during music discovery sessions
• Create permanent collections of favorite songs
• Save music for offline listening and easy access

📝 WHAT IT RETURNS:
• Confirmation of successful track saves
• Updated library count and collection size
• Timestamp information for when tracks were saved
• Error details for tracks that couldn't be saved
• Success status for bulk save operations

🔍 EXAMPLES:
• "Save 'Bohemian Rhapsody' to my library"
• "Add these 5 discovered tracks to my liked songs"
• "Save track IDs: 4uLU6hMCjMI75M1A2tKUQC, 7qiZfU4dY1lWllzX7mkmht"
• "Like all tracks from this great album"

💖 BUILDING YOUR COLLECTION:
• Creates permanent access to favorite music
• Tracks appear in your "Liked Songs" playlist
• Enables offline playback for saved content
• Perfect for building personalized music libraries
• Essential for music discovery and curation

💡 COLLECTION STRATEGIES:
• Save tracks immediately during discovery
• Build thematic collections of related music
• Use bulk saves for efficiency with multiple tracks
• Regular saving helps track music evolution
• Create personal "greatest hits" collections

⚠️ REQUIREMENTS:
• Valid Spotify access token with user-library-modify scope
• Tracks must be available in user's market
• Maximum 50 tracks can be saved per request`,
    schema: createSchema({
      token: commonSchemas.token(),
      trackIds: z
        .array(z.string())
        .describe("Array of Spotify track IDs to save"),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, trackIds } = args;
      return await spotifyService.saveTracks(token, trackIds);
    },
  },

  remove_tracks: {
    title: "Remove Tracks from Library",
    description: `Remove tracks from the user's personal library to maintain a curated collection of current favorites.

🎯 USE CASES:
• Clean up library by removing tracks you no longer enjoy
• Maintain relevance in your personal music collection
• Remove accidental saves and unwanted additions
• Update library to reflect changing musical tastes
• Organize library by removing outdated preferences

📝 WHAT IT RETURNS:
• Confirmation of successful track removals
• Updated library count after removals
• List of successfully removed tracks
• Error details for tracks that couldn't be removed
• Final library state after cleanup operation

🔍 EXAMPLES:
• "Remove 'Old Song' from my liked tracks"
• "Unlike these 3 tracks I no longer enjoy"
• "Remove track IDs: 1BxfuPKGuaTgP6aM0NMpti, 4LRPiXqCikLlN15c3yImP7"
• "Clean up my library by removing outdated music"

🧹 LIBRARY MAINTENANCE:
• Keeps collection current and relevant
• Reflects evolving musical tastes
• Maintains quality over quantity approach
• Perfect for regular library cleanup sessions
• Essential for curated collection management

💡 CURATION TIPS:
• Regular cleanup keeps library fresh
• Remove tracks that no longer resonate
• Consider seasonal relevance for cleanup timing
• Use bulk removals for major library overhauls
• Keep library aligned with current preferences

⚠️ REQUIREMENTS:
• Valid Spotify access token with user-library-modify scope
• Track IDs must match exactly for successful removal
• Maximum 50 tracks can be removed per request`,
    schema: createSchema({
      token: commonSchemas.token(),
      trackIds: z
        .array(z.string())
        .describe("Array of Spotify track IDs to remove"),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, trackIds } = args;
      return await spotifyService.removeTracks(token, trackIds);
    },
  },

  get_top_tracks: {
    title: "Get User's Top Tracks",
    description: `Discover your most listened-to tracks based on actual listening history across different time periods.

🎯 USE CASES:
• Understand your personal music listening patterns
• Create "Year in Music" summaries and personal statistics
• Build playlists based on your actual favorite songs
• Share your top music with friends and social media
• Track changes in musical preferences over time

📝 WHAT IT RETURNS:
• Your most played tracks ranked by listening frequency
• Track information with play count estimates
• Time-period specific listening statistics
• Artist and album information for top tracks
• Insights into your musical preferences and habits

🔍 EXAMPLES:
• "What are my top tracks this month?"
• "Show my most listened songs of all time"
• "Get my top 20 tracks from the last 6 months"
• "What songs have I been playing on repeat recently?"

⏰ TIME PERIODS:
• 'short_term' - Last 4 weeks of listening history
• 'medium_term' - Last 6 months of musical activity
• 'long_term' - All-time listening patterns and favorites
• Compare across periods to see taste evolution

📊 LISTENING INSIGHTS:
• Discover patterns in your music consumption
• Identify your most-loved songs across different eras
• Perfect for building "best of" personal playlists
• Great for music discovery based on your actual preferences
• Useful for understanding your musical identity

💡 PERSONAL ANALYTICS:
• Track how your taste evolves over time
• Identify seasonal listening patterns
• Use for building recommendation systems
• Share musical identity with others
• Create data-driven personal playlists

⚠️ REQUIREMENTS:
• Valid Spotify access token with user-top-read scope
• Sufficient listening history for accurate results`,
    schema: createSchema({
      token: commonSchemas.token(),
      timeRange: commonSchemas.timeRange(),
      limit: commonSchemas.limit(1, 50, 20),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, timeRange = "medium_term", limit = 20 } = args;
      return await spotifyService.getTopTracks(token, timeRange, limit);
    },
  },

  get_recently_played: {
    title: "Get Recently Played Tracks",
    description: `Access your complete recent listening history with timestamps for tracking music activity and rediscovering songs.

🎯 USE CASES:
• Track recent music discovery and listening habits
• Rediscover songs you heard but forgot to save
• Build "Recently Discovered" playlists from history
• Monitor listening patterns and music consumption
• Create activity logs for music journaling

📝 WHAT IT RETURNS:
• Chronological list of recently played tracks
• Exact timestamps of when each track was played
• Track information including artist, album, and duration
• Play context (playlist, album, or individual play)
• Device information where tracks were played

🔍 EXAMPLES:
• "What have I been listening to recently?"
• "Show my last 50 played tracks with timestamps"
• "What songs did I discover today?"
• "Get my recent listening history for this week"

⏰ LISTENING HISTORY:
• Shows exact sequence of recent music activity
• Includes partial plays and skips
• Perfect for rediscovering forgotten gems
• Great for tracking music exploration sessions
• Useful for building "recently discovered" collections

💡 HISTORY BENEFITS:
• Never lose track of songs you enjoyed
• Monitor listening habits and patterns
• Perfect for building discovery-based playlists
• Great for social sharing of recent finds
• Essential for music tracking and journaling

🎵 REDISCOVERY OPPORTUNITIES:
• Find songs you heard but didn't save
• Track down music from specific listening sessions
• Identify patterns in your music exploration
• Perfect for playlist creation from recent activity

⚠️ REQUIREMENTS:
• Valid Spotify access token with user-read-recently-played scope
• History shows approximately last 50 tracks played`,
    schema: createSchema({
      token: commonSchemas.token(),
      limit: commonSchemas.limit(1, 50, 20),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, limit = 20 } = args;
      return await spotifyService.getRecentlyPlayed(token, limit);
    },
  },
};
