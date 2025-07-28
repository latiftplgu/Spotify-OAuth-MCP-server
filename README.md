# Spotify MCP Server
[![smithery badge](https://smithery.ai/badge/@latiftplgu/spotify-oauth-mcp-server)](https://smithery.ai/server/@latiftplgu/spotify-oauth-mcp-server)

A comprehensive **Model Context Protocol (MCP)** server that provides seamless integration between AI assistants (like Claude Desktop) and the Spotify Web API. This server enables AI assistants to interact with Spotify's music streaming service through a well-structured, type-safe interface.

## 🎵 Overview

This MCP server acts as a bridge between AI assistants and Spotify's Web API, allowing users to:

- Search for music, artists, albums, and playlists
- Control playback (play, pause, skip, volume control)
- Manage playlists (create, modify, add/remove tracks)
- Access user profiles and music libraries
- Retrieve detailed audio features and recommendations

## ✨ Key Features

### 🛠️ **44 Comprehensive Tools** across 7 categories:

- **Albums** (4 tools): Album information and new releases
- **Artists** (7 tools): Artist data, top tracks, and related artists
- **Tracks** (9 tools): Track details, audio features, and library management
- **Playlists** (10 tools): Complete playlist management and discovery
- **Playback** (11 tools): Full player control and device management
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
"Show me the audio features of this track"
"Find similar artists to Radiohead"
"What's currently playing?"
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
│       ├── artists.ts        # Artist-related tools (7 tools)
│       ├── tracks.ts         # Track-related tools (9 tools)
│       ├── playlists.ts      # Playlist management tools (10 tools)
│       ├── playback.ts       # Playback control tools (11 tools)
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
- `get_albums`: Get multiple albums at once

### Artists (7 tools)

- `get_artist`: Get detailed artist information
- `get_artist_albums`: Retrieve artist's albums
- `get_artist_top_tracks`: Get artist's most popular tracks
- `get_related_artists`: Find similar artists
- `get_artists`: Get multiple artists at once
- `follow_artist`: Follow an artist
- `unfollow_artist`: Unfollow an artist

### Tracks (9 tools)

- `get_track`: Get detailed track information
- `get_track_audio_features`: Analyze track's audio characteristics
- `get_recommendations`: Get personalized recommendations
- `save_track`: Add track to user's library
- `remove_saved_track`: Remove track from library
- `check_saved_tracks`: Check if tracks are saved
- `get_saved_tracks`: Get user's saved tracks
- `get_tracks`: Get multiple tracks at once
- `get_audio_features`: Get audio features for multiple tracks

### Playlists (10 tools)

- `get_playlist`: Retrieve playlist details
- `get_playlist_tracks`: Get tracks from a playlist
- `create_playlist`: Create a new playlist
- `add_tracks_to_playlist`: Add tracks to a playlist
- `remove_tracks_from_playlist`: Remove tracks from a playlist
- `update_playlist`: Modify playlist details
- `get_user_playlists`: Get user's playlists
- `get_featured_playlists`: Discover featured playlists
- `follow_playlist`: Follow a playlist
- `unfollow_playlist`: Unfollow a playlist

### Playback (11 tools)

- `get_playback_state`: Get current playback information
- `start_playback`: Start or resume playback
- `pause_playback`: Pause current playback
- `skip_to_next`: Skip to next track
- `skip_to_previous`: Skip to previous track
- `seek_to_position`: Seek to specific position in track
- `set_repeat_mode`: Change repeat mode
- `set_shuffle_state`: Toggle shuffle mode
- `set_volume`: Adjust playback volume
- `get_available_devices`: List available playback devices
- `transfer_playback`: Switch playback between devices

### User (1 tool)

- `get_current_user`: Get current user's profile information

### Search (2 tools)

- `search`: Search for tracks, artists, albums, or playlists
- `search_and_play`: Search for content and immediately start playback

---

**Happy Music Streaming with AI! 🎵🤖**
