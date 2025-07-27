# Spotify MCP Server - Refactored Architecture

This directory contains the refactored Spotify MCP (Model Context Protocol) server with a clean, modular architecture.

## 📁 Project Structure

```
src/mcp/
├── server.ts              # Main MCP server entry point
├── schemas/
│   └── common.ts          # Reusable schema builders and common parameters
└── tools/
    ├── index.ts           # Tool registry and automated registration system
    ├── albums.ts          # Album-related tools
    ├── artists.ts         # Artist-related tools
    ├── tracks.ts          # Track-related tools
    ├── playlists.ts       # Playlist-related tools
    ├── playback.ts        # Playback control tools
    ├── user.ts            # User profile tools
    └── search.ts          # General search tools
```

## 🔄 Refactoring Improvements

### Before vs After

**Before:**

- ❌ Single 1000+ line file with repetitive definitions
- ❌ Manual tool registration with hard-coded mappings
- ❌ JSON Schema → Zod conversion complexity
- ❌ Difficult to maintain and extend

**After:**

- ✅ **Modular Architecture**: Tools organized by feature categories
- ✅ **Reusable Components**: Common schema builders eliminate duplication
- ✅ **Type Safety**: Full TypeScript support with Zod schemas
- ✅ **Automated Registration**: Dynamic tool discovery and registration
- ✅ **Better Organization**: 47 tools across 7 logical categories

## 🛠️ Key Features

### 1. Common Schema Builders (`schemas/common.ts`)

Reusable parameter builders that eliminate code duplication:

```typescript
// Instead of repeating token definitions
commonSchemas.token(); // Spotify access token
commonSchemas.limit(1, 50, 20); // Pagination with min/max/default
commonSchemas.spotifyId("track"); // Track/album/artist ID with context
commonSchemas.deviceId(); // Optional device ID
```

### 2. Feature-Based Tool Modules

Each module contains related tools with consistent structure:

```typescript
export const albumTools = {
  get_album: {
    title: "Get Album",
    description: "Retrieve detailed information about a specific album",
    schema: createSchema({
      token: commonSchemas.token(),
      albumId: commonSchemas.spotifyId("album"),
    }),
    handler: async (args, spotifyService) => {
      const { token, albumId } = args;
      return await spotifyService.getAlbum(token, albumId);
    },
  },
  // ... more tools
};
```

### 3. Automated Tool Registration (`tools/index.ts`)

The `ToolRegistrar` class provides:

- **Automatic discovery** of all tools across modules
- **Zod validation** of tool arguments
- **Error handling** with descriptive messages
- **MCP compatibility** layer

```typescript
const toolRegistrar = new ToolRegistrar(spotifyService);
const handlers = toolRegistrar.getToolHandlers(); // Auto-generated handlers
const definitions = toolRegistrar.getMcpToolDefinitions(); // MCP format
```

## 📊 Tool Categories

| Category  | Count | Description                                |
| --------- | ----- | ------------------------------------------ |
| Albums    | 4     | Album information and new releases         |
| Artists   | 7     | Artist data, albums, and relationships     |
| Tracks    | 9     | Track details, audio features, and library |
| Playlists | 10    | Playlist management and discovery          |
| Playback  | 11    | Player controls and device management      |
| User      | 1     | User profile information                   |
| Search    | 2     | General search and search-to-play          |

**Total: 44 tools** organized across 7 logical categories

## 🚀 Benefits

1. **Maintainability**: Easy to add/modify tools in specific categories
2. **Reusability**: Common schemas prevent duplication
3. **Type Safety**: Full TypeScript and Zod validation
4. **Performance**: More efficient registration and validation
5. **Developer Experience**: Clear organization and better error messages
6. **Extensibility**: Simple pattern for adding new tool categories

## 📝 Usage

The refactored server maintains full backward compatibility while providing a much cleaner internal structure. All 44 Spotify tools are automatically registered and available for use by MCP clients.

```bash
# Start the server (same as before)
npm start
```

The server will automatically discover and register all tools from the modular structure, providing better logging with category breakdowns and improved error handling.
