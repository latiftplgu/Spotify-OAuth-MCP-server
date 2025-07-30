# Spotify MCP Server

A comprehensive **Model Context Protocol (MCP)** server that provides seamless integration between AI assistants (like Claude Desktop) and the Spotify Web API. This server enables AI assistants to interact with Spotify's music streaming service through a well-structured, type-safe interface.

## 🎵 Overview

This MCP server acts as a bridge between AI assistants and Spotify's Web API, allowing users to:

- Search for music, artists, albums, and playlists
- Control playback (play, pause, skip, volume control)
- Manage playlists (create, modify, add/remove tracks)
- Access user profiles and music libraries
- Manage user's music library (save/remove tracks)
- Get user's listening history and top content
- Retrieve song lyrics with synchronized timestamps

## ✨ Key Features

### 🛠️ **29 Comprehensive Tools** across 7 categories:

- **Albums** (4 tools): Album information and new releases
- **Artists** (6 tools): Artist data, top tracks, and discovery
- **Tracks** (8 tools): Track details, lyrics, and library management
- **Playlists** (10 tools): Complete playlist management and discovery
- **Playback** (10 tools): Full player control and device management
- **User** (1 tool): User profile information
- **Search** (2 tools): General search and search-to-play functionality

### 🏗️ **Clean Architecture**:

- **Modular Design**: Feature-based tool organization
- **Type Safety**: Full TypeScript implementation with Zod validation
- **Reusable Components**: Common schema builders eliminate code duplication
- **Automatic Registration**: Tools are automatically discovered and registered
- **Error Handling**: Comprehensive error management with descriptive messages

### 🔧 **Developer Experience**:

- **Easy Extension**: Simple pattern for adding new tools
- **Maintainable Code**: Clear separation of concerns
- **Documentation**: Self-documenting schema definitions
- **Debugging**: Detailed logging and error reporting

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd Spotify-OAuth-MCP-server
npm install
```

### 2. Get Spotify Access Token

### 3. Build and Start

```bash
# Build the TypeScript code
npm run build

# Start the MCP server
npm start

# For development with auto-reload
npm run dev
```

## 🔧 Claude Desktop Integration

To use this MCP server with Claude Desktop, add it to your MCP configuration:

### macOS/Linux: `~/Library/Application Support/Claude/claude_desktop_config.json`

### Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "spotify": {
      "command": "node",
      "args": ["/path/to/your/project/src/mcp/server.js"]
    }
  }
}
```

## 📖 Usage Examples

Once integrated with Claude Desktop, you can use natural language commands:

```
"Play my Discover Weekly playlist"
"Search for songs by The Beatles"
"Add this song to my favorites"
"Skip to the next track"
"Create a new playlist called 'Morning Vibes'"
"Search for playlists with chill music"
"Show me my top artists this month"
"What's currently playing?"
"Add this song to my queue"
"Get my recently played tracks"
"Show me the lyrics for this song"
"Get synchronized lyrics for karaoke"
```

## 🏗️ Project Architecture

```
src/
├── mcp/
│   ├── server.ts              # Main MCP server entry point
│   ├── helpers/
│   │   └── utils.ts          # Utility functions and helpers
│   ├── schemas/
│   │   └── common.ts         # Reusable schema builders
│   └── tools/
│       ├── index.ts          # Tool registry and registration system
│       ├── albums.ts         # Album-related tools (4 tools)
│       ├── artists.ts        # Artist-related tools (6 tools)
│       ├── tracks.ts         # Track-related tools (8 tools)
│       ├── playlists.ts      # Playlist management tools (10 tools)
│       ├── playback.ts       # Playback control tools (10 tools)
│       ├── user.ts           # User profile tools (1 tool)
│       └── search.ts         # Search functionality tools (2 tools)
└── spotify.ts                # Spotify Web API service class
```

### Architecture Benefits

1. **Modularity**: Each tool category is self-contained
2. **Type Safety**: Full TypeScript and Zod validation throughout
3. **Reusability**: Common schemas prevent code duplication
4. **Scalability**: Easy to add new tools and categories
5. **Maintainability**: Clear separation of concerns
6. **Performance**: Efficient registration and validation

## 🛠️ Available Tools

### Albums (4 tools)

- `get_album`: Retrieve detailed album information
- `get_album_tracks`: Get tracks from a specific album
- `get_new_releases`: Discover new album releases
- `search_albums`: Search for albums by keywords

### Artists (6 tools)

- `get_artist`: Get detailed artist information
- `get_artist_albums`: Retrieve artist's albums
- `get_artist_top_tracks`: Get artist's most popular tracks
- `search_artists`: Search for artists by keywords
- `get_followed_artists`: Get user's followed artists
- `get_top_artists`: Get user's top artists

### Tracks (8 tools)

- `get_track`: Get detailed track information
- `search_tracks`: Search for tracks by keywords
- `get_liked_tracks`: Get user's saved/liked tracks
- `save_tracks`: Add tracks to user's library
- `remove_tracks`: Remove tracks from user's library
- `get_top_tracks`: Get user's top tracks
- `get_recently_played`: Get recently played tracks
- `get_track_lyrics`: Get synchronized and plain text lyrics for tracks

### Playlists (10 tools)

- `get_playlist`: Retrieve playlist details
- `get_user_playlists`: Get user's playlists
- `get_playlist_tracks`: Get tracks from a playlist
- `create_playlist`: Create a new playlist
- `add_to_playlist`: Add tracks to a playlist
- `remove_from_playlist`: Remove tracks from a playlist
- `search_playlists`: Search for playlists by keywords
- `get_categories`: Get browse categories
- `save_playlist`: Follow/save a user-created playlist
- `unsave_playlist`: Unfollow/unsave a playlist

### Playback (10 tools)

- `get_currently_playing`: Get current playback information
- `start_playback`: Start music playback
- `resume_player`: Resume paused playback
- `pause_player`: Pause current playback
- `skip_to_next`: Skip to next track
- `skip_to_previous`: Skip to previous track
- `set_volume`: Adjust playback volume
- `add_to_queue`: Add song to playback queue
- `get_devices`: Get available playback devices
- `transfer_playback`: Switch playback between devices

### User (1 tool)

- `get_user_profile`: Get current user's profile information

### Search (2 tools)

- `search_music`: Search for tracks, artists, albums, or playlists
- `search_and_play_music`: Search for content and immediately start playback

---

**Happy Music Streaming with AI! 🎵🤖**
