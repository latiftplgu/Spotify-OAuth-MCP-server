import { commonSchemas, createSchema } from "../schemas/common";
import { SpotifyService } from "../../spotify";
import { z } from "zod";

export const playbackTools = {
  get_currently_playing: {
    title: "Get Currently Playing Track",
    description: `Get real-time information about what's currently playing in the user's Spotify session.

🎯 USE CASES:
• Display "Now Playing" information in applications
• Track listening history and habits in real-time
• Create social media posts about current music
• Build music discovery features based on current listening
• Monitor playback state for automation and smart home integration

📝 WHAT IT RETURNS:
• Currently playing track with artist and album information
• Playback progress (current position vs. total duration)
• Playback state (playing, paused, stopped)
• Active device information and volume level
• Shuffle and repeat mode settings
• Track popularity and explicit content flags

🔍 EXAMPLES:
• "What song is currently playing?"
• "Show me my current playback status"
• "Get the current track and how much time is left"
• "What device am I listening on right now?"

💡 REAL-TIME FEATURES:
• Updates instantly as tracks change
• Shows exact playback position down to milliseconds
• Indicates if user is actively listening or paused
• Perfect for building live music widgets

⚠️ REQUIREMENTS:
• Valid Spotify access token with user-read-playback-state scope
• User must have an active Spotify session`,
    schema: createSchema({
      token: commonSchemas.token(),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token } = args;
      return await spotifyService.getCurrentPlayback(token);
    },
  },

  start_playback: {
    title: "Start Music Playback",
    description: `Initiate music playback with specific tracks, albums, playlists, or artist collections.

🎯 USE CASES:
• Start playing music when users enter smart spaces
• Create voice-activated music requests
• Build custom music controllers and interfaces
• Implement mood-based automatic music selection
• Start themed playlists for events, workouts, or activities

📝 WHAT IT RETURNS:
• Confirmation of playback initiation
• Current track information and playback state
• Device information where playback started
• Error details if playback couldn't start
• Queue information showing what will play next

🔍 EXAMPLES:
• "Play my Discover Weekly playlist"
• "Start playing the album 'Abbey Road'"
• "Play tracks by The Beatles on my laptop"
• "Begin playback of my liked songs"

🎵 PLAYBACK OPTIONS:
• contextUri: Play entire albums, playlists, or artist catalogs
• trackUris: Play specific individual tracks in order
• deviceId: Choose which device should start playing
• Can resume from where you left off or start fresh

⚠️ REQUIREMENTS:
• Valid Spotify access token with user-modify-playback-state scope
• User must have an active Spotify device available
• Content must be available in user's market`,
    schema: createSchema({
      token: commonSchemas.token(),
      contextUri: z
        .string()
        .optional()
        .describe("Spotify context URI (album, playlist, artist) to play"),
      trackUris: z
        .array(z.string())
        .optional()
        .describe("Array of specific track URIs to play"),
      deviceId: commonSchemas.deviceId(),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, contextUri, trackUris, deviceId } = args;
      return await spotifyService.playMusic(
        token,
        trackUris,
        contextUri,
        deviceId
      );
    },
  },

  resume_player: {
    title: "Resume Player",
    description: `Resume paused playback or continue playing from where the user left off.

🎯 USE CASES:
• Resume music after phone calls or interruptions
• Continue playback when returning to apps or devices
• Implement "play/pause" toggle functionality
• Resume listening after switching between devices
• Restore playback state in smart home automations

📝 WHAT IT RETURNS:
• Confirmation of resumed playback
• Current track and position information
• Updated playback state showing active play
• Device information where playback resumed
• Remaining track duration and queue preview

🔍 EXAMPLES:
• "Resume my music where I left off"
• "Continue playing on my phone"
• "Resume the playlist I was listening to"
• "Start playing again on my smart speaker"

💡 SMART RESUME:
• Picks up exactly where playback was paused
• Maintains queue order and shuffle settings
• Preserves repeat mode and volume level
• Can resume on the same or different device

⚠️ REQUIREMENTS:
• Valid Spotify access token with user-modify-playback-state scope
• Previous playback session must exist to resume
• Target device must be available and active`,
    schema: createSchema({
      token: commonSchemas.token(),
      contextUri: z
        .string()
        .optional()
        .describe("Spotify context URI (album, playlist, artist) to play"),
      trackUris: z
        .array(z.string())
        .optional()
        .describe("Array of track URIs to play"),
      deviceId: commonSchemas.deviceId(),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, contextUri, trackUris, deviceId } = args;
      return await spotifyService.resumePlayback(
        token,
        contextUri,
        trackUris,
        deviceId
      );
    },
  },

  pause_player: {
    title: "Pause Player",
    description: `Pause the current music playback while maintaining position and queue state.

🎯 USE CASES:
• Pause music during calls, meetings, or conversations
• Create automatic pause triggers for smart home systems
• Implement voice commands for hands-free control
• Pause playback when leaving designated areas
• Build custom music control interfaces with pause functionality

📝 WHAT IT RETURNS:
• Confirmation of successful pause operation
• Final playback position before pausing
• Current track information preserved for resume
• Device state showing paused status
• Queue information maintained for later resume

🔍 EXAMPLES:
• "Pause my music"
• "Stop playing on my bedroom speaker"
• "Pause the current track"
• "Hold the music for a moment"

💡 PAUSE BENEFITS:
• Preserves exact playback position for seamless resume
• Maintains queue, shuffle, and repeat settings
• Keeps track information available for display
• Allows for quick resume without losing context

⚠️ REQUIREMENTS:
• Valid Spotify access token with user-modify-playback-state scope
• Active playback session must be running
• User must have appropriate device permissions`,
    schema: createSchema({
      token: commonSchemas.token(),
      deviceId: commonSchemas.deviceId(),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, deviceId } = args;
      return await spotifyService.pausePlayback(token, deviceId);
    },
  },

  skip_to_next: {
    title: "Skip to Next Track",
    description: `Skip to the next track in the user's playback queue or playlist.

🎯 USE CASES:
• Skip songs that don't match current mood or activity
• Navigate through playlists and albums quickly
• Build custom music control interfaces
• Create voice-activated skip commands
• Implement automatic skipping based on user preferences

📝 WHAT IT RETURNS:
• Information about the new track that started playing
• Updated playback position reset to beginning
• Queue information showing remaining tracks
• Confirmation of successful skip operation
• Device state with new playback status

🔍 EXAMPLES:
• "Skip to the next song"
• "Play the next track in this playlist"
• "Move forward to the next song"
• "I don't like this song, skip it"

🎵 SKIP BEHAVIOR:
• Follows playlist/album order when not shuffled
• Respects shuffle mode for random progression
• May trigger repeat behavior at end of playlists
• Updates listening history and statistics
• Can trigger discovery algorithms for similar music

⚠️ REQUIREMENTS:
• Valid Spotify access token with user-modify-playback-state scope
• Active playback session with available next track
• User must have appropriate device control permissions`,
    schema: createSchema({
      token: commonSchemas.token(),
      deviceId: commonSchemas.deviceId(),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, deviceId } = args;
      return await spotifyService.skipToNext(token, deviceId);
    },
  },

  skip_to_previous: {
    title: "Skip to Previous Track",
    description: `Skip to the previous track or restart the current track from the beginning.

🎯 USE CASES:
• Go back to replay favorite parts of songs
• Navigate backwards through playlists or albums
• Correct accidental skips to next track
• Replay tracks that were particularly enjoyable
• Build comprehensive playback control systems

📝 WHAT IT RETURNS:
• Information about the track that started playing
• Playback position reset to beginning of track
• Updated queue and playback state information
• Confirmation of successful skip operation
• Device status with new playback details

🔍 EXAMPLES:
• "Go back to the previous song"
• "Play that last track again"
• "Skip back to the song before this one"
• "I want to hear that again"

🎵 SKIP BEHAVIOR:
• Restarts current track if more than 3 seconds have played
• Goes to actual previous track if within first 3 seconds
• Follows reverse playlist/album order
• Respects shuffle mode for random navigation
• Updates position in listening history

⚠️ REQUIREMENTS:
• Valid Spotify access token with user-modify-playback-state scope
• Active playback session currently running
• Previous track must exist in queue or history`,
    schema: createSchema({
      token: commonSchemas.token(),
      deviceId: commonSchemas.deviceId(),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, deviceId } = args;
      return await spotifyService.skipToPrevious(token, deviceId);
    },
  },

  set_volume: {
    title: "Set Player Volume",
    description: `Adjust the volume level for the user's active Spotify device.

🎯 USE CASES:
• Create dynamic volume adjustments for different times of day
• Build smart home automation with volume control
• Implement voice commands for hands-free volume changes
• Adjust volume based on ambient noise levels
• Create custom audio experience controls

📝 WHAT IT RETURNS:
• Confirmation of successful volume change
• Current volume level after adjustment
• Device information showing updated state
• Previous volume level for potential undo functionality
• Playback state with new volume settings

🔍 EXAMPLES:
• "Set volume to 50%"
• "Lower the volume to 25"
• "Turn up the music to 80%"
• "Make it quieter, set to 15%"

🔊 VOLUME CONTROL:
• Range: 0-100 percent
• 0 = Complete silence (muted)
• 100 = Maximum device volume
• Changes apply instantly during playback
• Preserves volume setting for future sessions

⚠️ REQUIREMENTS:
• Valid Spotify access token with user-modify-playback-state scope
• Active device that supports volume control
• Device must be currently available and responsive`,
    schema: createSchema({
      token: commonSchemas.token(),
      volumePercent: commonSchemas.volumePercent(),
      deviceId: commonSchemas.deviceId(),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, volumePercent, deviceId } = args;
      return await spotifyService.setVolume(token, volumePercent, deviceId);
    },
  },

  add_to_queue: {
    title: "Add Song to Queue",
    description: `Add a specific track to the user's playback queue for immediate or upcoming playback.

🎯 USE CASES:
• Queue up requested songs during parties or events
• Build dynamic playlists on-the-fly based on mood
• Add discovery tracks without interrupting current playlist
• Create collaborative queuing for shared listening sessions
• Implement "play this next" functionality

📝 WHAT IT RETURNS:
• Confirmation that track was added to queue
• Position of track in the upcoming queue
• Estimated time until track will play
• Current queue length and upcoming tracks preview
• Track information that was successfully queued

🔍 EXAMPLES:
• "Add 'Bohemian Rhapsody' to my queue"
• "Queue up the track spotify:track:4uLU6hMCjMI75M1A2tKUQC"
• "Add this song to play next"
• "Put 'Sweet Child O Mine' in my queue"

🎵 QUEUE BEHAVIOR:
• Tracks play in the order they were added
• Queue plays after current track/playlist ends
• Maintains queue across device switches
• Can add multiple tracks for extended queuing
• Integrates with existing shuffle and repeat settings

⚠️ REQUIREMENTS:
• Valid Spotify access token with user-modify-playback-state scope
• Track must be available in user's market
• Active playback session or available device required`,
    schema: createSchema({
      token: commonSchemas.token(),
      trackUri: z
        .string()
        .describe(
          "Spotify track URI (e.g., 'spotify:track:4uLU6hMCjMI75M1A2tKUQC')"
        ),
      deviceId: commonSchemas.deviceId(),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, trackUri, deviceId } = args;
      return await spotifyService.addToQueue(token, trackUri, deviceId);
    },
  },

  get_devices: {
    title: "Get User Devices",
    description: `Retrieve all available Spotify-connected devices for the user's account.

🎯 USE CASES:
• Display device options for playback targeting
• Build device management and control interfaces
• Check which devices are currently online and available
• Monitor device battery levels and connection status
• Create smart home integrations with Spotify-enabled devices

📝 WHAT IT RETURNS:
• Complete list of user's connected devices
• Device names, types, and unique identifiers
• Current active state and availability status
• Volume levels and playback capabilities
• Device restrictions and supported features

🔍 EXAMPLES:
• "Show me all my Spotify devices"
• "What devices can I play music on?"
• "List my available speakers and phones"
• "Which devices are currently online?"

🔧 DEVICE TYPES:
• Computer (desktop/laptop applications)
• Smartphone (mobile apps)
• Speaker (smart speakers, soundbars)
• TV (smart TVs, streaming devices)
• Car (automotive systems)
• Game Console (PlayStation, Xbox)

💡 DEVICE MANAGEMENT:
• Shows real-time availability status
• Indicates which device is currently active
• Displays volume control capabilities
• Shows device-specific restrictions
• Perfect for building device selector UIs

⚠️ REQUIREMENTS:
• Valid Spotify access token with user-read-playback-state scope
• At least one Spotify-enabled device must be logged in`,
    schema: createSchema({
      token: commonSchemas.token(),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token } = args;
      return await spotifyService.getUserDevices(token);
    },
  },

  transfer_playback: {
    title: "Transfer Playback",
    description: `Seamlessly transfer active playback from one device to another while maintaining playback state.

🎯 USE CASES:
• Move music from phone to home speakers when arriving home
• Switch from desktop to phone when leaving office
• Transfer playback to car system when starting drive
• Move music between rooms using different smart speakers
• Continue listening on different devices without interruption

📝 WHAT IT RETURNS:
• Confirmation of successful transfer
• New active device information
• Preserved playback position and queue
• Current track information on new device
• Transfer success status and any error details

🔍 EXAMPLES:
• "Transfer playback to my bedroom speaker"
• "Move music to my phone"
• "Switch playback to device ID: 1a2b3c4d5e6f"
• "Continue playing on my laptop"

🔄 TRANSFER FEATURES:
• Maintains exact playback position
• Preserves queue, shuffle, and repeat settings
• Keeps volume level appropriate for target device
• Option to start playing immediately or stay paused
• Seamless transition with minimal interruption

💡 SMART HANDOFFS:
• Perfect for multi-room audio setups
• Enables mobility without losing music context
• Great for smart home automation scenarios
• Supports lifestyle-based listening patterns

⚠️ REQUIREMENTS:
• Valid Spotify access token with user-modify-playback-state scope
• Target device must be available and online
• User must have control permissions for target device`,
    schema: createSchema({
      token: commonSchemas.token(),
      deviceId: z
        .string()
        .describe("The ID of the device to transfer playback to"),
      play: z
        .boolean()
        .default(false)
        .describe("Whether to start playing immediately after transfer"),
    }),
    handler: async (args: any, spotifyService: SpotifyService) => {
      const { token, deviceId, play = false } = args;
      return await spotifyService.transferPlayback(token, deviceId, play);
    },
  },
};
