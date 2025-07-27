import { commonSchemas, createSchema } from "../schemas/common";
import { SpotifyService } from "../../spotify";

export const artistTools = {
  get_artist: {
    title: "Get Artist",
    description: `Get comprehensive information about any artist including their biography, genres, and popularity metrics.

🎯 USE CASES:
• Research artist background before concerts or festivals
• Build artist-focused playlists with complete discography knowledge
• Discover artist genres and influences for music recommendations
• Analyze artist popularity trends and follower growth
• Create detailed artist profiles for music databases

📝 WHAT IT RETURNS:
• Artist name, biography, and profile images
• Genre classifications and musical styles
• Spotify popularity score and follower count
• External URLs (official website, social media)
• Related artist suggestions and collaborators

🔍 EXAMPLES:
• "Get information about Taylor Swift"
• "Show me details for artist ID: 06HL4z0CvFAxyc27GXpf02"
• "I want to learn about this new artist I discovered"
• "Get profile info for the band that sang this song"

💡 TIPS:
• Use before exploring an artist's full catalog
• Great for understanding an artist's evolution over time
• Check follower count to gauge current popularity

⚠️ REQUIREMENTS:
• Valid Spotify access token
• Artist must exist in Spotify's database`,
    schema: createSchema({
      token: commonSchemas.token(),
      artistId: commonSchemas.spotifyId("artist"),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, artistId } = args;
      return await spotifyService.getArtist(token, artistId);
    },
  },

  get_artist_albums: {
    title: "Get Artist Albums",
    description: `Explore an artist's complete discography including albums, singles, compilations, and appearances.

🎯 USE CASES:
• Building complete artist discography playlists
• Discovering rare releases and B-sides
• Tracking artist evolution through their album releases
• Finding collaborations and featured appearances
• Creating chronological listening experiences

📝 WHAT IT RETURNS:
• Complete album listing with release dates and types
• Album artwork and track counts
• Collaboration information and featured artists
• Market availability and release formats
• Popularity metrics for each release

🔍 EXAMPLES:
• "Get all albums by The Beatles"
• "Show me Drake's singles and EPs only"
• "Find all releases by artist ID: 4dpARuHxo51G3z768sgnrY"
• "I want to see Beyoncé's complete discography"

💡 ALBUM TYPES:
• 'album' - Full studio albums
• 'single' - Singles and EPs
• 'compilation' - Greatest hits, compilations
• 'appears_on' - Featured appearances on other artists' work

⚠️ REQUIREMENTS:
• Valid Spotify access token
• Artist must have releases available`,
    schema: createSchema({
      token: commonSchemas.token(),
      artistId: commonSchemas.spotifyId("artist"),
      albumType: commonSchemas.albumType(),
      limit: commonSchemas.limit(1, 50, 20),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, artistId, albumType = "album", limit = 20 } = args;
      return await spotifyService.getArtistAlbums(
        token,
        artistId,
        albumType,
        limit
      );
    },
  },

  get_related_artists: {
    title: "Get Related Artists",
    description: `Discover artists similar to your favorites based on Spotify's sophisticated recommendation algorithms.

🎯 USE CASES:
• Music discovery through artist similarities
• Building genre-cohesive playlists with multiple artists
• Finding new artists if you like a specific musician
• Exploring musical genres and subgenres systematically
• Creating festival or concert lineups with complementary artists

📝 WHAT IT RETURNS:
• Up to 20 related artists with similarity scores
• Artist names, images, and genre information
• Popularity metrics and follower counts
• Links to explore each related artist further
• Spotify's confidence in each recommendation

🔍 EXAMPLES:
• "Find artists similar to Radiohead"
• "Who are artists related to Taylor Swift?"
• "Show me musicians like Kendrick Lamar"
• "I love Billie Eilish, find similar artists"

💡 HOW IT WORKS:
• Based on user listening patterns and musical similarity
• Considers genre, style, and collaborative history
• Uses advanced machine learning algorithms
• Updates regularly based on streaming data

⚠️ REQUIREMENTS:
• Valid Spotify access token
• Artist must have sufficient data for recommendations`,
    schema: createSchema({
      token: commonSchemas.token(),
      artistId: commonSchemas.spotifyId("artist"),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, artistId } = args;
      return await spotifyService.getRelatedArtists(token, artistId);
    },
  },

  get_artist_top_tracks: {
    title: "Get Artist Top Tracks",
    description: `Discover an artist's most popular and widely-played tracks based on global streaming data.

🎯 USE CASES:
• Quick introduction to an artist's biggest hits
• Building "best of" playlists for parties or events
• Understanding which songs made an artist famous
• Creating radio-friendly playlists with mainstream appeal
• Checking what's trending from your favorite artists

📝 WHAT IT RETURNS:
• Top 10 tracks ranked by global popularity
• Track names, album information, and release dates
• Popularity scores and play count estimates
• Preview URLs and track durations
• Market-specific popularity rankings

🔍 EXAMPLES:
• "What are Ed Sheeran's top tracks?"
• "Show me The Weeknd's biggest hits in the US"
• "Get Ariana Grande's most popular songs"
• "Find the top tracks for artist ID: 1Xyo4u8uXC1ZmMpatF05PJ"

🌍 MARKET SPECIFICITY:
• Results can vary by country/region
• Reflects local music preferences and cultural differences
• Use country parameter for region-specific results
• Defaults to US market if not specified

⚠️ REQUIREMENTS:
• Valid Spotify access token
• Artist must have released tracks`,
    schema: createSchema({
      token: commonSchemas.token(),
      artistId: commonSchemas.spotifyId("artist"),
      country: commonSchemas.country(),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, artistId, country = "US" } = args;
      return await spotifyService.getArtistTopTracks(token, artistId, country);
    },
  },

  search_artists: {
    title: "Search Artists",
    description: `Search for artists using names, genres, or keywords to discover new music and talent.

🎯 USE CASES:
• Finding artists when you only remember partial names
• Discovering artists within specific genres or styles
• Locating emerging or independent artists
• Building diverse playlists with multiple artists
• Researching artists for events or collaborations

📝 WHAT IT RETURNS:
• Ranked artist results based on search relevance
• Artist names, images, and genre classifications
• Popularity scores and follower counts
• Links to explore each artist's catalog
• External URLs and social media links

🔍 EXAMPLES:
• "Search for 'jazz pianist' artists"
• "Find artists named 'John'"
• "Look for 'indie rock' bands"
• "Search for artists from 'Nashville'"
• "Find 'female rapper' artists"

💡 SEARCH STRATEGIES:
• Use genre keywords: "progressive metal", "folk acoustic"
• Include location: "Seattle grunge", "Detroit techno"
• Try instrument-specific searches: "saxophone", "violin"
• Use descriptive terms: "soulful", "experimental", "classical"

⚠️ REQUIREMENTS:
• Valid Spotify access token
• Meaningful search keywords for best results`,
    schema: createSchema({
      token: commonSchemas.token(),
      query: commonSchemas.searchQuery("artists (artist name, keywords)"),
      limit: commonSchemas.limit(1, 50, 20),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, query, limit = 20 } = args;
      return await spotifyService.searchArtists(token, query, limit);
    },
  },

  get_followed_artists: {
    title: "Get Followed Artists",
    description: `Retrieve the complete list of artists that the user actively follows on Spotify.

🎯 USE CASES:
• Managing your followed artists collection
• Creating playlists from your favorite artists only
• Checking for new releases from followed artists
• Organizing your music library by preferred artists
• Exporting your music taste profile for other platforms

📝 WHAT IT RETURNS:
• Complete list of artists you follow
• Artist names, images, and genre information
• Follower counts and popularity metrics
• Follow date and relationship duration
• Quick access to each artist's catalog

🔍 EXAMPLES:
• "Show me all artists I follow"
• "Get my followed artists, limit to 50"
• "Who are the artists in my following list?"
• "Export my followed artists for playlist creation"

💡 MANAGEMENT TIPS:
• Regularly review to unfollow inactive artists
• Use this list to check for new releases
• Great for creating "favorites only" playlists
• Perfect for music taste analysis and statistics

⚠️ REQUIREMENTS:
• Valid Spotify access token with user-follow-read scope
• User must have followed at least one artist`,
    schema: createSchema({
      token: commonSchemas.token(),
      limit: commonSchemas.limit(1, 50, 20),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, limit = 20 } = args;
      return await spotifyService.getFollowedArtists(token, limit);
    },
  },

  get_top_artists: {
    title: "Get User's Top Artists",
    description: `Analyze your personal listening habits to discover your most played artists over different time periods.

🎯 USE CASES:
• Understanding your personal music taste evolution
• Creating "Year in Music" summaries and statistics
• Building playlists based on your actual listening habits
• Sharing your music taste with friends and social media
• Discovering patterns in your music preferences

📝 WHAT IT RETURNS:
• Your most listened-to artists ranked by play time
• Artist names, images, and genre breakdowns
• Listening statistics and time-period comparisons
• Popularity scores and follower information
• Insights into your musical preferences

🔍 EXAMPLES:
• "Who are my top artists this month?"
• "Show my most played artists of all time"
• "Get my top 10 artists from the last 6 months"
• "What artists have I been listening to most recently?"

⏰ TIME RANGES:
• 'short_term' - Last 4 weeks of listening
• 'medium_term' - Last 6 months of listening  
• 'long_term' - All-time listening history
• Compare across different periods for insights

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
      return await spotifyService.getTopArtists(token, timeRange, limit);
    },
  },
};
