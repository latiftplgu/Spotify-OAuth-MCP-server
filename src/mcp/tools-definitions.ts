export interface ToolProperty {
  type: string;
  description: string;
  enum?: string[];
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  default?: any;
  items?: {
    type: string;
  };
}

export interface ToolInputSchema {
  type: "object";
  properties: Record<string, ToolProperty>;
  required: string[];
}

export interface ToolDefinition {
  title: string;
  description: string;
  prompt: string;
  inputSchema: ToolInputSchema;
}

export const SPOTIFY_TOOLS: Record<string, ToolDefinition> = {
  get_album: {
    title: "Get Album",
    description:
      "Retrieve detailed information about a specific album by its Spotify ID or URI",
    prompt:
      "Use this tool to get comprehensive album information including tracks, release date, and metadata. Provide the album's Spotify ID or URI.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        albumId: {
          type: "string",
          description:
            "Spotify album ID or URI (e.g., '4aawyAB9vmqN3uQ7FjRGTy' or 'spotify:album:4aawyAB9vmqN3uQ7FjRGTy')",
        },
      },
      required: ["token", "albumId"],
    },
  },

  get_new_releases: {
    title: "Get New Album Releases",
    description: "Get the latest album releases available on Spotify",
    prompt:
      "Use this tool to discover newly released albums on Spotify. You can specify the number of results and country for localized content.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 50,
          default: 20,
          description: "Number of albums to return (1-50)",
        },
        country: {
          type: "string",
          minLength: 2,
          maxLength: 2,
          description: "Country code for localized content (e.g., 'US', 'GB')",
        },
      },
      required: ["token"],
    },
  },

  get_album_tracks: {
    title: "Get Album Tracks",
    description:
      "Get all tracks from a specific album by its Spotify ID or URI",
    prompt:
      "Use this tool to get the complete track listing for an album. Provide the album's Spotify ID or URI to retrieve all tracks with their details.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        albumId: {
          type: "string",
          description: "Spotify album ID or URI",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 50,
          default: 50,
          description: "Number of tracks to return (1-50)",
        },
      },
      required: ["token", "albumId"],
    },
  },

  search_albums: {
    title: "Search Albums",
    description: "Search for albums by keyword, artist name, or album title",
    prompt:
      "Use this tool to find albums on Spotify. You can search by album name, artist, or any related keywords. The search is flexible and will return matching results.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        query: {
          type: "string",
          description: "Search query for albums (album name, artist, keywords)",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 50,
          default: 20,
          description: "Number of results to return (1-50)",
        },
      },
      required: ["token", "query"],
    },
  },

  get_artist: {
    title: "Get Artist",
    description:
      "Retrieve detailed information about a specific artist by their Spotify ID or URI",
    prompt:
      "Use this tool to get comprehensive artist information including biography, genres, popularity, and follower count. Provide the artist's Spotify ID or URI.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        artistId: {
          type: "string",
          description:
            "Spotify artist ID or URI (e.g., '4Z8W4fKeB5YxbusRsdQVPb' or 'spotify:artist:4Z8W4fKeB5YxbusRsdQVPb')",
        },
      },
      required: ["token", "artistId"],
    },
  },
  get_artist_albums: {
    title: "Get Artist Albums",
    description:
      "Get all albums by a specific artist using their Spotify ID or URI",
    prompt:
      "Use this tool to retrieve all albums released by an artist. You can filter by album type (album, single, compilation) and specify the number of results.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        artistId: {
          type: "string",
          description: "Spotify artist ID or URI",
        },
        albumType: {
          type: "string",
          enum: ["album", "single", "appears_on", "compilation"],
          default: "album",
          description: "Type of albums to include",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 50,
          default: 20,
          description: "Number of albums to return (1-50)",
        },
      },
      required: ["token", "artistId"],
    },
  },
  get_related_artists: {
    title: "Get Related Artists",
    description:
      "Get artists related to a specific artist by their Spotify ID or URI",
    prompt:
      "Use this tool to find artists similar to a given artist. This helps discover new music based on artist similarity and user listening patterns.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        artistId: {
          type: "string",
          description: "Spotify artist ID or URI",
        },
      },
      required: ["token", "artistId"],
    },
  },
  get_artist_top_tracks: {
    title: "Get Artist Top Tracks",
    description:
      "Get the top tracks of a specific artist by their Spotify ID or URI",
    prompt:
      "Use this tool to get the most popular tracks by an artist. This returns the artist's most played songs based on Spotify's popularity metrics.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        artistId: {
          type: "string",
          description: "Spotify artist ID or URI",
        },
        country: {
          type: "string",
          minLength: 2,
          maxLength: 2,
          default: "US",
          description: "Country code for localized top tracks",
        },
      },
      required: ["token", "artistId"],
    },
  },
  search_artists: {
    title: "Search Artists",
    description: "Search for artists by name or keyword",
    prompt:
      "Use this tool to find artists on Spotify. Search by artist name or related keywords to discover artists.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        query: {
          type: "string",
          description: "Search query for artists (artist name, keywords)",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 50,
          default: 20,
          description: "Number of results to return (1-50)",
        },
      },
      required: ["token", "query"],
    },
  },

  get_liked_tracks: {
    title: "Get Liked Tracks",
    description: "Get the user's saved/liked tracks from their library",
    prompt:
      "Use this tool to retrieve all tracks that the user has saved to their library (liked songs). You can specify how many tracks to return.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 50,
          default: 20,
          description: "Number of tracks to return (1-50)",
        },
        offset: {
          type: "number",
          minimum: 0,
          default: 0,
          description: "Offset for pagination",
        },
      },
      required: ["token"],
    },
  },
  save_tracks: {
    title: "Save Tracks to Library",
    description: "Save one or more tracks to the user's library (like songs)",
    prompt:
      "Use this tool to add tracks to the user's liked songs. Provide track IDs to save them to the user's library.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        trackIds: {
          type: "array",
          items: {
            type: "string",
          },
          description: "Array of Spotify track IDs to save",
        },
      },
      required: ["token", "trackIds"],
    },
  },
  remove_tracks: {
    title: "Remove Tracks from Library",
    description:
      "Remove one or more tracks from the user's library (unlike songs)",
    prompt:
      "Use this tool to remove tracks from the user's liked songs. Provide track IDs to remove them from the user's library.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        trackIds: {
          type: "array",
          items: {
            type: "string",
          },
          description: "Array of Spotify track IDs to remove",
        },
      },
      required: ["token", "trackIds"],
    },
  },

  get_followed_artists: {
    title: "Get Followed Artists",
    description: "Get the artists that the user follows",
    prompt:
      "Use this tool to retrieve all artists that the user is currently following on Spotify.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 50,
          default: 20,
          description: "Number of artists to return (1-50)",
        },
      },
      required: ["token"],
    },
  },
  get_user_profile: {
    title: "Get User Profile",
    description: "Get the current user's profile information",
    prompt:
      "Use this tool to retrieve the authenticated user's Spotify profile details including display name, follower count, and subscription info.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
      },
      required: ["token"],
    },
  },
  get_top_tracks: {
    title: "Get User's Top Tracks",
    description:
      "Get the user's most listened to tracks over different time periods",
    prompt:
      "Use this tool to get the user's most played tracks. You can specify different time ranges: short_term (4 weeks), medium_term (6 months), or long_term (several years).",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        timeRange: {
          type: "string",
          enum: ["short_term", "medium_term", "long_term"],
          default: "medium_term",
          description: "Time range for top tracks",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 50,
          default: 20,
          description: "Number of tracks to return (1-50)",
        },
      },
      required: ["token"],
    },
  },
  get_top_artists: {
    title: "Get User's Top Artists",
    description:
      "Get the user's most listened to artists over different time periods",
    prompt:
      "Use this tool to get the user's most played artists. You can specify different time ranges to see listening habits over time.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        timeRange: {
          type: "string",
          enum: ["short_term", "medium_term", "long_term"],
          default: "medium_term",
          description: "Time range for top artists",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 50,
          default: 20,
          description: "Number of artists to return (1-50)",
        },
      },
      required: ["token"],
    },
  },

  add_to_queue: {
    title: "Add Song to Queue",
    description: "Add a track to the user's playback queue",
    prompt:
      "Use this tool to add a specific track to the user's queue. The track will be played after the current track and any other queued tracks.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        trackUri: {
          type: "string",
          description:
            "Spotify track URI (e.g., 'spotify:track:4uLU6hMCjMI75M1A2tKUQC')",
        },
        deviceId: {
          type: "string",
          description:
            "Spotify device ID (optional, uses active device if not specified)",
        },
      },
      required: ["token", "trackUri"],
    },
  },
  get_currently_playing: {
    title: "Get Currently Playing Track",
    description:
      "Get information about the user's current playback including track, artist, and playback state",
    prompt:
      "Use this tool to see what track is currently playing, including playback position, device information, and track details.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
      },
      required: ["token"],
    },
  },
  skip_to_next: {
    title: "Skip to Next Track",
    description: "Skip to the next track in the user's queue",
    prompt:
      "Use this tool to skip the currently playing track and move to the next track in the queue or playlist.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        deviceId: {
          type: "string",
          description:
            "Spotify device ID (optional, uses active device if not specified)",
        },
      },
      required: ["token"],
    },
  },
  pause_player: {
    title: "Pause Player",
    description: "Pause the user's current playback",
    prompt:
      "Use this tool to pause the currently playing track. The playback can be resumed later from the same position.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        deviceId: {
          type: "string",
          description:
            "Spotify device ID (optional, uses active device if not specified)",
        },
      },
      required: ["token"],
    },
  },
  skip_to_previous: {
    title: "Skip to Previous Track",
    description: "Skip to the previous track or restart the current track",
    prompt:
      "Use this tool to go back to the previous track in the queue or playlist, or restart the current track if it just started.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        deviceId: {
          type: "string",
          description:
            "Spotify device ID (optional, uses active device if not specified)",
        },
      },
      required: ["token"],
    },
  },
  get_recently_played: {
    title: "Get Recently Played Tracks",
    description: "Get the user's recently played tracks with timestamps",
    prompt:
      "Use this tool to see the user's listening history including recently played tracks with timestamps and context information.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 50,
          default: 20,
          description: "Number of recently played items to return (1-50)",
        },
      },
      required: ["token"],
    },
  },
  resume_player: {
    title: "Resume Player",
    description: "Resume or start playback on the user's active device",
    prompt:
      "Use this tool to resume paused playback or start playing music. You can optionally specify tracks, albums, or playlists to play.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        contextUri: {
          type: "string",
          description:
            "Spotify context URI (album, playlist, artist) to play (optional)",
        },
        trackUris: {
          type: "array",
          items: {
            type: "string",
          },
          description: "Array of track URIs to play (optional)",
        },
        deviceId: {
          type: "string",
          description:
            "Spotify device ID (optional, uses active device if not specified)",
        },
      },
      required: ["token"],
    },
  },
  set_volume: {
    title: "Set Player Volume",
    description: "Set the volume level for the user's active device",
    prompt:
      "Use this tool to control the playback volume. Specify a volume level between 0 (mute) and 100 (maximum volume).",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        volumePercent: {
          type: "number",
          minimum: 0,
          maximum: 100,
          description: "Volume level as a percentage (0-100)",
        },
        deviceId: {
          type: "string",
          description:
            "Spotify device ID (optional, uses active device if not specified)",
        },
      },
      required: ["token", "volumePercent"],
    },
  },
  start_playback: {
    title: "Start Music Playback",
    description:
      "Start playing music with specific tracks, albums, or playlists",
    prompt:
      "Use this tool to start music playback. You can play specific tracks, albums, playlists, or artists by providing their Spotify URIs.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        contextUri: {
          type: "string",
          description: "Spotify context URI (album, playlist, artist) to play",
        },
        trackUris: {
          type: "array",
          items: {
            type: "string",
          },
          description: "Array of specific track URIs to play",
        },
        deviceId: {
          type: "string",
          description:
            "Spotify device ID (optional, uses active device if not specified)",
        },
      },
      required: ["token"],
    },
  },

  add_to_playlist: {
    title: "Add Item to Playlist",
    description: "Add one or more tracks to a specific playlist",
    prompt:
      "Use this tool to add tracks to an existing playlist. Provide the playlist ID and track URIs to add them to the playlist.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        playlistId: {
          type: "string",
          description: "Spotify playlist ID",
        },
        trackUris: {
          type: "array",
          items: {
            type: "string",
          },
          description: "Array of track URIs to add to the playlist",
        },
      },
      required: ["token", "playlistId", "trackUris"],
    },
  },
  create_playlist: {
    title: "Create Playlist",
    description: "Create a new playlist for the user",
    prompt:
      "Use this tool to create a new playlist. You can specify the name, description, and privacy settings for the new playlist.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        name: {
          type: "string",
          description: "Name for the new playlist",
        },
        description: {
          type: "string",
          description: "Description for the playlist (optional)",
        },
        isPublic: {
          type: "boolean",
          default: true,
          description: "Whether the playlist should be public",
        },
      },
      required: ["token", "name"],
    },
  },
  get_playlist: {
    title: "Get Playlist",
    description: "Get detailed information about a specific playlist",
    prompt:
      "Use this tool to get comprehensive information about a playlist including tracks, metadata, and owner information.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        playlistId: {
          type: "string",
          description: "Spotify playlist ID",
        },
      },
      required: ["token", "playlistId"],
    },
  },
  get_user_playlists: {
    title: "Get User Playlists",
    description: "Get all playlists owned or followed by the user",
    prompt:
      "Use this tool to retrieve all playlists associated with the user, including both owned and followed playlists.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 50,
          default: 20,
          description: "Number of playlists to return (1-50)",
        },
      },
      required: ["token"],
    },
  },
  get_playlist_tracks: {
    title: "Get Playlist Tracks",
    description: "Get all tracks from a specific playlist by its URI or ID",
    prompt:
      "Use this tool to get the complete track listing for a playlist. Provide the playlist ID or URI to retrieve all tracks.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        playlistId: {
          type: "string",
          description: "Spotify playlist ID or URI",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 50,
          default: 50,
          description: "Number of tracks to return (1-50)",
        },
      },
      required: ["token", "playlistId"],
    },
  },
  remove_from_playlist: {
    title: "Remove Item from Playlist",
    description: "Remove one or more tracks from a specific playlist",
    prompt:
      "Use this tool to remove tracks from a playlist. Provide the playlist ID and track URIs to remove them.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        playlistId: {
          type: "string",
          description: "Spotify playlist ID",
        },
        trackUris: {
          type: "array",
          items: {
            type: "string",
          },
          description: "Array of track URIs to remove from the playlist",
        },
      },
      required: ["token", "playlistId", "trackUris"],
    },
  },
  search_playlists: {
    title: "Search Playlists",
    description: "Search for playlists by keyword or name",
    prompt:
      "Use this tool to find playlists on Spotify. Search by playlist name, description, or related keywords.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        query: {
          type: "string",
          description: "Search query for playlists (name, keywords)",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 50,
          default: 20,
          description: "Number of results to return (1-50)",
        },
      },
      required: ["token", "query"],
    },
  },

  get_track: {
    title: "Get Track",
    description:
      "Get detailed information about a specific track by its Spotify ID or URI",
    prompt:
      "Use this tool to get comprehensive track information including artist, album, duration, popularity, and metadata.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        trackId: {
          type: "string",
          description: "Spotify track ID or URI",
        },
      },
      required: ["token", "trackId"],
    },
  },
  get_audio_features: {
    title: "Get Track Audio Features",
    description:
      "Get detailed audio features and analysis for a specific track",
    prompt:
      "Use this tool to get audio characteristics like tempo, key, energy, danceability, and other audio features for musical analysis.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        trackId: {
          type: "string",
          description: "Spotify track ID",
        },
      },
      required: ["token", "trackId"],
    },
  },
  search_tracks: {
    title: "Search Tracks",
    description: "Search for tracks by keyword, artist, album, or song title",
    prompt:
      "Use this tool to find tracks on Spotify. You can search by song title, artist name, album, or any combination of keywords.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        query: {
          type: "string",
          description:
            "Search query for tracks (song title, artist, album, keywords)",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 50,
          default: 20,
          description: "Number of results to return (1-50)",
        },
      },
      required: ["token", "query"],
    },
  },
  get_recommendations: {
    title: "Get Track Recommendations",
    description:
      "Get personalized track recommendations based on seed tracks, artists, or genres",
    prompt:
      "Use this tool to get music recommendations. You can base recommendations on seed tracks, artists, genres, or audio features.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        seedTracks: {
          type: "array",
          items: {
            type: "string",
          },
          description: "Array of seed track IDs (up to 5)",
        },
        seedArtists: {
          type: "array",
          items: {
            type: "string",
          },
          description: "Array of seed artist IDs (up to 5)",
        },
        seedGenres: {
          type: "array",
          items: {
            type: "string",
          },
          description: "Array of seed genres (up to 5)",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 100,
          default: 20,
          description: "Number of recommendations to return (1-100)",
        },
      },
      required: ["token"],
    },
  },
  search_music: {
    title: "Search Music",
    description: "Search for music by keyword with flexible type filtering",
    prompt:
      "Use this tool to search for any type of music content on Spotify. You can search by keyword and specify the type (track, album, artist, playlist).",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        query: {
          type: "string",
          description:
            "Search query for music content (keyword, title, artist)",
        },
        type: {
          type: "string",
          enum: ["track", "album", "artist", "playlist"],
          default: "track",
          description: "Type of content to search for",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 50,
          default: 10,
          description: "Number of results to return (1-50)",
        },
      },
      required: ["token", "query"],
    },
  },
  search_and_play_music: {
    title: "Search and Play Music",
    description: "Search for a track and immediately start playing it",
    prompt:
      "Use this tool to search for a track by keyword and automatically start playing the first result. This combines search and playback in one action.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        query: {
          type: "string",
          description: "Search query for the track to find and play",
        },
      },
      required: ["token", "query"],
    },
  },

  get_featured_playlists: {
    title: "Get Featured Playlists",
    description: "Get Spotify's featured playlists for discovery",
    prompt:
      "Use this tool to get curated playlists featured by Spotify, great for music discovery and trending content.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 50,
          default: 20,
          description: "Number of playlists to return (1-50)",
        },
        country: {
          type: "string",
          minLength: 2,
          maxLength: 2,
          description: "Country code for localized content",
        },
      },
      required: ["token"],
    },
  },
  get_categories: {
    title: "Get Browse Categories",
    description: "Get all available categories for browsing music",
    prompt:
      "Use this tool to get music categories like 'Pop', 'Rock', 'Hip-Hop', etc. for browsing and discovering music by genre or mood.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 50,
          default: 20,
          description: "Number of categories to return (1-50)",
        },
        country: {
          type: "string",
          minLength: 2,
          maxLength: 2,
          description: "Country code for localized content",
        },
      },
      required: ["token"],
    },
  },
  get_category_playlists: {
    title: "Get Category Playlists",
    description: "Get playlists for a specific category",
    prompt:
      "Use this tool to get playlists from a specific category (like 'Pop', 'Workout', 'Chill', etc.).",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        categoryId: {
          type: "string",
          description: "Spotify category ID",
        },
        limit: {
          type: "number",
          minimum: 1,
          maximum: 50,
          default: 20,
          description: "Number of playlists to return (1-50)",
        },
      },
      required: ["token", "categoryId"],
    },
  },

  get_devices: {
    title: "Get User Devices",
    description: "Get the user's available Spotify devices",
    prompt:
      "Use this tool to get a list of all available Spotify devices for the user, including active status and device information.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
      },
      required: ["token"],
    },
  },

  transfer_playback: {
    title: "Transfer Playback",
    description: "Transfer playback to a different device",
    prompt:
      "Use this tool to transfer the current playback to a specific device. You can also choose whether to start playing immediately.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Spotify access token for authentication",
        },
        deviceId: {
          type: "string",
          description: "The ID of the device to transfer playback to",
        },
        play: {
          type: "boolean",
          default: false,
          description: "Whether to start playing immediately after transfer",
        },
      },
      required: ["token", "deviceId"],
    },
  },
};
