import { commonSchemas, createSchema } from "../schemas/common";
import { SpotifyService } from "../../spotify";
import { z } from "zod";

export const playlistTools = {
  get_playlist: {
    title: "Get Playlist",
    description: `Retrieve comprehensive information about any Spotify playlist including tracks, metadata, and creator details.

🎯 USE CASES:
• Analyze playlist contents before following or copying
• Check playlist length and total duration for events
• View track listing to discover new music
• Research playlist themes and genre consistency
• Export playlist information for backup or sharing

📝 WHAT IT RETURNS:
• Complete playlist metadata (name, description, creator)
• Full track listing with artist and album information
• Playlist artwork, follower count, and popularity metrics
• Track order, durations, and explicit content flags
• Public/private status and collaborative settings

🔍 EXAMPLES:
• "Get details for Today's Top Hits playlist"
• "Show me the tracks in playlist ID: 37i9dQZF1DXcBWIGoYBM5M"
• "What songs are in my workout playlist?"
• "Analyze this collaborative playlist my friends made"

💡 PLAYLIST INSIGHTS:
• Perfect for playlist curation and discovery
• Check before adding to your library
• Great for party planning and event music selection
• Useful for understanding music trends and preferences

⚠️ REQUIREMENTS:
• Valid Spotify access token
• Playlist must be public or user must have access`,
    schema: createSchema({
      token: commonSchemas.token(),
      playlistId: commonSchemas.spotifyId("playlist"),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, playlistId } = args;
      return await spotifyService.getPlaylist(token, playlistId);
    },
  },

  get_user_playlists: {
    title: "Get User Playlists",
    description: `Retrieve all playlists that the user owns, follows, or has access to in their Spotify library.

🎯 USE CASES:
• Display user's complete playlist collection in applications
• Create playlist management interfaces and organizers
• Backup playlist metadata and track relationships
• Build playlist analytics and listening habit insights
• Implement playlist search and filtering systems

📝 WHAT IT RETURNS:
• Complete list of user's playlists (owned and followed)
• Playlist names, descriptions, and artwork
• Creator information and follower counts
• Track counts, durations, and last modification dates
• Public/private status and collaborative permissions

🔍 EXAMPLES:
• "Show me all my playlists"
• "Get my playlist collection with 50 items"
• "List all playlists I follow and created"
• "What playlists do I have in my library?"

📊 PLAYLIST ORGANIZATION:
• Includes both created and followed playlists
• Shows ownership and collaboration status
• Perfect for playlist management dashboards
• Great for discovering forgotten playlists
• Useful for library cleanup and organization

💡 MANAGEMENT TIPS:
• Regular review helps maintain organized library
• Check for duplicate or outdated playlists
• Identify collaborative playlists for group management
• Monitor follower growth on public playlists

⚠️ REQUIREMENTS:
• Valid Spotify access token with playlist-read-private scope
• User must have at least one playlist in their library`,
    schema: createSchema({
      token: commonSchemas.token(),
      limit: commonSchemas.limit(1, 50, 20),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, limit = 20 } = args;
      return await spotifyService.getUserPlaylists(token, limit);
    },
  },

  get_playlist_tracks: {
    title: "Get Playlist Tracks",
    description: `Get the complete track listing from any playlist with detailed song information and metadata.

🎯 USE CASES:
• Extract songs from playlists for custom music apps
• Analyze musical patterns and genre distributions
• Create backup copies or derivative playlists
• Study playlist curation and track progression
• Build recommendation systems based on playlist contents

📝 WHAT IT RETURNS:
• Complete ordered track listing from the playlist
• Song titles, artists, albums, and release dates
• Track durations, popularity scores, and preview URLs
• Added date and user who added each track
• Explicit content flags and market availability

🔍 EXAMPLES:
• "Get all tracks from my 'Road Trip' playlist"
• "Show me songs in playlist ID: 1BxfuPKGuaTgP6aM0NMpti"
• "List tracks from Spotify's RapCaviar playlist"
• "Extract songs from this collaborative party playlist"

🎵 TRACK DETAILS:
• Maintains original playlist order and context
• Shows track addition history and contributors
• Includes full metadata for each song
• Perfect for playlist analysis and music research
• Great for creating similar or inspired playlists

💡 ANALYSIS OPPORTUNITIES:
• Genre distribution and musical diversity
• Track popularity trends within playlists
• Artist frequency and collaboration patterns
• Temporal patterns in track additions

⚠️ REQUIREMENTS:
• Valid Spotify access token
• Playlist must be accessible to the user
• Respect rate limits for large playlists`,
    schema: createSchema({
      token: commonSchemas.token(),
      playlistId: commonSchemas.spotifyId("playlist"),
      limit: commonSchemas.limit(1, 50, 50),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, playlistId, limit = 50 } = args;
      return await spotifyService.getPlaylistTracks(token, playlistId, limit);
    },
  },

  create_playlist: {
    title: "Create Playlist",
    description: `Create a new custom playlist in the user's Spotify library with specified name and settings.

🎯 USE CASES:
• Build themed playlists for specific moods or activities
• Create event-specific music collections for parties
• Organize music discoveries into curated collections
• Build workout, study, or relaxation playlists
• Create collaborative playlists for groups and friends

📝 WHAT IT RETURNS:
• New playlist information with unique Spotify ID
• Playlist URL for easy sharing and access
• Creation confirmation with metadata
• Empty playlist ready for track additions
• Settings confirmation (public/private, collaborative)

🔍 EXAMPLES:
• "Create a playlist called 'Summer Vibes 2024'"
• "Make a private playlist for my workout music"
• "Create 'Study Sessions' playlist with description"
• "Build a collaborative playlist for our road trip"

🎵 PLAYLIST CUSTOMIZATION:
• Custom name and description for context
• Public or private visibility settings
• Collaborative options for group contributions
• Ready for immediate track additions
• Perfect foundation for curated collections

💡 CREATION STRATEGIES:
• Use descriptive names for easy discovery
• Add detailed descriptions for context
• Consider privacy settings based on content
• Plan collaborative access for group playlists
• Create multiple themed playlists for organization

⚠️ REQUIREMENTS:
• Valid Spotify access token with playlist-modify-public/private scopes
• Unique playlist name (duplicates allowed but not recommended)`,
    schema: createSchema({
      token: commonSchemas.token(),
      name: z.string().describe("Name for the new playlist"),
      description: z
        .string()
        .optional()
        .describe("Description for the playlist"),
      isPublic: z
        .boolean()
        .default(true)
        .describe("Whether the playlist should be public"),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, name, description = "", isPublic = true } = args;
      return await spotifyService.createPlaylist(
        token,
        name,
        description,
        isPublic
      );
    },
  },

  add_to_playlist: {
    title: "Add Tracks to Playlist",
    description: `Add one or more tracks to any existing playlist that the user owns or can modify.

🎯 USE CASES:
• Build and curate playlist collections with discovered music
• Add recommended tracks from discovery algorithms
• Collaborate on shared playlists with friends
• Create themed collections by adding related songs
• Maintain dynamic playlists that evolve with listening habits

📝 WHAT IT RETURNS:
• Confirmation of successful track additions
• Updated playlist length and total duration
• New track positions within the playlist
• Snapshot ID for tracking playlist changes
• Error details for any tracks that couldn't be added

🔍 EXAMPLES:
• "Add 'Bohemian Rhapsody' to my Rock Classics playlist"
• "Put these 5 songs into my workout playlist"
• "Add track spotify:track:4uLU6hMCjMI75M1A2tKUQC to favorites"
• "Include all these discovered songs in my new releases list"

🎵 ADDITION FEATURES:
• Add single tracks or multiple tracks at once
• Tracks appear at the end of existing playlist
• Maintains playlist order and structure
• Supports bulk additions for efficiency
• Perfect for playlist curation and growth

💡 CURATION TIPS:
• Add tracks that fit the playlist theme or mood
• Consider track flow and transitions
• Test songs before adding to public playlists
• Use bulk additions for efficiency
• Regular playlist maintenance keeps content fresh

⚠️ REQUIREMENTS:
• Valid Spotify access token with playlist-modify scopes
• User must own playlist or have collaborative access
• Tracks must be available in user's market`,
    schema: createSchema({
      token: commonSchemas.token(),
      playlistId: commonSchemas.spotifyId("playlist"),
      trackUris: commonSchemas.trackUris(),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, playlistId, trackUris } = args;
      return await spotifyService.addTracksToPlaylist(
        token,
        playlistId,
        trackUris
      );
    },
  },

  remove_from_playlist: {
    title: "Remove Tracks from Playlist",
    description: `Remove unwanted tracks from any playlist that the user owns or can modify.

🎯 USE CASES:
• Clean up playlists by removing outdated or unwanted songs
• Maintain playlist quality by pruning poor matches
• Remove duplicates and fix playlist organization
• Update seasonal playlists by removing irrelevant tracks
• Collaborate on playlist refinement with shared editing

📝 WHAT IT RETURNS:
• Confirmation of successful track removals
• Updated playlist length and duration
• New snapshot ID reflecting the changes
• List of successfully removed tracks
• Error details for tracks that couldn't be removed

🔍 EXAMPLES:
• "Remove 'Yesterday' from my Modern Hits playlist"
• "Delete these 3 songs from my party playlist"
• "Remove track spotify:track:4uLU6hMCjMI75M1A2tKUQC from favorites"
• "Clean up duplicate songs from my road trip playlist"

🧹 CLEANING FEATURES:
• Remove single tracks or multiple tracks at once
• Maintains playlist integrity after removals
• Preserves order of remaining tracks
• Perfect for playlist maintenance and curation
• Supports bulk removals for efficiency

💡 MAINTENANCE TIPS:
• Regular cleanup keeps playlists relevant
• Remove songs that no longer fit the theme
• Check for duplicates and outdated content
• Consider seasonal relevance for themed playlists
• Use bulk removals for major playlist overhauls

⚠️ REQUIREMENTS:
• Valid Spotify access token with playlist-modify scopes
• User must own playlist or have collaborative access
• Track URIs must match exactly for successful removal`,
    schema: createSchema({
      token: commonSchemas.token(),
      playlistId: commonSchemas.spotifyId("playlist"),
      trackUris: commonSchemas.trackUris(),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, playlistId, trackUris } = args;
      return await spotifyService.removeTracksFromPlaylist(
        token,
        playlistId,
        trackUris
      );
    },
  },

  search_playlists: {
    title: "Search Playlists",
    description: `Search for public playlists using keywords, themes, or specific criteria to discover curated music collections.

🎯 USE CASES:
• Discover playlists for specific moods, activities, or genres
• Find curated music collections for events or occasions
• Explore community-created playlists and music trends
• Research popular playlist themes and curation styles
• Find inspiration for creating your own playlist collections

📝 WHAT IT RETURNS:
• Ranked playlist results based on search relevance
• Playlist names, descriptions, and creator information
• Follower counts, track counts, and playlist popularity
• Playlist artwork and last modification dates
• Links to explore and follow discovered playlists

🔍 EXAMPLES:
• "Search for 'workout motivation' playlists"
• "Find playlists with 'indie rock' in the title"
• "Look for 'chill studying' playlist collections"
• "Search for 'party music' playlists with many followers"

🔍 SEARCH STRATEGIES:
• Use activity keywords: "running", "studying", "party"
• Include genre terms: "jazz", "electronic", "country"
• Try mood descriptors: "chill", "upbeat", "melancholy"
• Combine terms: "indie folk acoustic", "90s hip hop"
• Search for seasonal themes: "summer", "holiday", "spring"

💡 DISCOVERY BENEFITS:
• Access to expertly curated music collections
• Discover new artists through themed playlists
• Find music for specific activities or moods
• Learn about playlist curation and organization
• Connect with music communities and trends

⚠️ REQUIREMENTS:
• Valid Spotify access token
• Results limited to public playlists only`,
    schema: createSchema({
      token: commonSchemas.token(),
      query: commonSchemas.searchQuery("playlists (name, keywords)"),
      limit: commonSchemas.limit(1, 50, 20),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, query, limit = 20 } = args;
      return await spotifyService.searchPlaylists(token, query, limit);
    },
  },

  get_categories: {
    title: "Get Browse Categories",
    description: `Explore all available music categories that Spotify uses to organize and classify playlists and content.

🎯 USE CASES:
• Build category-based music browsing interfaces
• Discover music genres and style classifications
• Create organized music discovery experiences
• Research music categorization and taxonomy
• Build genre-specific playlist recommendation systems

📝 WHAT IT RETURNS:
• Complete list of Spotify's music categories
• Category names, descriptions, and representative icons
• Genre classifications and style groupings
• Category popularity and playlist counts
• Links to explore category-specific content

🔍 EXAMPLES:
• "Show me all music categories on Spotify"
• "Get browse categories for music discovery"
• "What genres and categories are available?"
• "List all music classification categories"

🗂️ CATEGORY TYPES:
• Genre categories: Rock, Pop, Hip-Hop, Electronic, etc.
• Mood categories: Chill, Party, Focus, Sleep, etc.
• Activity categories: Workout, Commute, Gaming, etc.
• Demographic categories: Kids, Decades, Regional, etc.
• Special categories: New Releases, Charts, Discover, etc.

💡 ORGANIZATION BENEFITS:
• Systematic approach to music discovery
• Clear classification for different musical styles
• Perfect for building browsing interfaces
• Helps users navigate vast music catalogs
• Professional categorization system

🎯 USE IN APPLICATIONS:
• Create category-based navigation menus
• Build genre-specific recommendation engines
• Organize music content systematically
• Provide structured music discovery experiences

⚠️ REQUIREMENTS:
• Valid Spotify access token
• Categories reflect current Spotify organization`,
    schema: createSchema({
      token: commonSchemas.token(),
      limit: commonSchemas.limit(1, 50, 20),
      country: commonSchemas.country(),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, limit = 20, country } = args;
      return await spotifyService.getCategories(token, limit, country);
    },
  },

  save_playlist: {
    title: "Save Playlist",
    description: `Save a user-created playlist to your Spotify library (follow playlist).

🎯 USE CASES:
• Add user-created playlists to your library for offline access
• Follow collaborative playlists from friends
• Organize personal playlists into collections
• Follow community-created playlists

📝 WHAT IT RETURNS:
• Confirmation of successful playlist save/follow
• Updated library status
• Playlist URL for easy sharing and access
• Error details for any failed saves

🔍 EXAMPLES:
• "Save this collaborative playlist my friend created"
• "Follow this user-generated workout playlist"
• "Add this personal playlist to my library"

💡 SAVE FEATURES:
• Works with user-created playlists
• Maintains playlist order and structure
• Perfect for following collaborative playlists
• Enables offline access to followed playlists

🚫 LIMITATIONS (as of November 27, 2024):
• Cannot save Spotify's official/editorial playlists
• Cannot follow algorithmic playlists (Discover Weekly, etc.)
• Only works with playlists created by users
• Spotify-owned playlists are restricted

🔧 TROUBLESHOOTING:
• If you get 404 error: The playlist might be Spotify-owned
• Try with user-created playlists instead
• Check if playlist is public and accessible

⚠️ REQUIREMENTS:
• Valid Spotify access token with playlist-modify-public scope
• Playlist must be user-created (not Spotify-owned)
• Playlist must be public or accessible to your account`,
    schema: createSchema({
      token: commonSchemas.token(),
      playlistId: commonSchemas.spotifyId("playlist"),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, playlistId } = args;
      return await spotifyService.savePlaylist(token, playlistId);
    },
  },

  unsave_playlist: {
    title: "Remove Playlist from Library",
    description: `Remove a user-created playlist from your Spotify library (unfollow playlist).

🎯 USE CASES:
• Clean up library by unfollowing user-created playlists
• Unfollow collaborative playlists that no longer match preferences
• Remove personal playlist follows
• Organize library by removing temporary follows

📝 WHAT IT RETURNS:
• Confirmation of successful playlist unfollow
• Updated library status
• Status of the removal operation
• Error details for any failed removals

🔍 EXAMPLES:
• "Unfollow this user-created playlist"
• "Remove this collaborative playlist from my library"
• "Stop following this personal playlist"

💡 REMOVAL FEATURES:
• Instantly unfollows playlist from your library
• Doesn't delete the original playlist
• You can re-follow the playlist anytime
• Perfect for library maintenance

🚫 LIMITATIONS (as of November 27, 2024):
• Cannot unfollow Spotify's official/editorial playlists
• Cannot affect algorithmic playlists (they auto-appear)
• Only works with user-created playlists you follow
• Spotify-owned playlists are restricted

🔧 TROUBLESHOOTING:
• If you get 404 error: The playlist might be Spotify-owned
• Ensure you're currently following the playlist
• Only works with user-created playlists

💡 MANAGEMENT TIPS:
• Regular cleanup helps keep library organized
• Unfollow playlists you no longer listen to
• Consider creating your own versions of favorites
• Use this for managing collaborative playlist follows

⚠️ REQUIREMENTS:
• Valid Spotify access token with playlist-modify-public scope
• Playlist must be user-created (not Spotify-owned)
• You must currently be following the playlist`,
    schema: createSchema({
      token: commonSchemas.token(),
      playlistId: commonSchemas.spotifyId("playlist"),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, playlistId } = args;
      return await spotifyService.unsavePlaylist(token, playlistId);
    },
  },
};
