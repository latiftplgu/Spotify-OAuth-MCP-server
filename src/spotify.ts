import axios, { AxiosResponse } from "axios";

export interface SpotifyUser {
  id: string;
  display_name: string;
  email?: string;
  followers: { total: number };
  country?: string;
  product?: string;
  images?: SpotifyImage[];
}

export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  uri: string;
  duration_ms: number;
  explicit: boolean;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: "track";
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  external_urls: { spotify: string };
}

export interface SpotifyArtist {
  id: string;
  name: string;
  uri: string;
  type: "artist";
  external_urls: { spotify: string };
  followers?: { total: number };
  genres?: string[];
  images?: SpotifyImage[];
  popularity?: number;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  uri: string;
  type: "album";
  album_type: "album" | "single" | "compilation";
  artists: SpotifyArtist[];
  available_markets: string[];
  external_urls: { spotify: string };
  images: SpotifyImage[];
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  total_tracks: number;
  tracks?: {
    items: SpotifyTrack[];
    total: number;
  };
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  uri: string;
  type: "playlist";
  description: string | null;
  external_urls: { spotify: string };
  followers: { total: number };
  images: SpotifyImage[];
  owner: {
    id: string;
    display_name: string;
    external_urls: { spotify: string };
  };
  public: boolean;
  collaborative: boolean;
  tracks: {
    total: number;
    items?: PlaylistTrack[];
  };
}

export interface PlaylistTrack {
  added_at: string;
  added_by: {
    id: string;
    external_urls: { spotify: string };
  };
  is_local: boolean;
  track: SpotifyTrack;
}

export interface AudioFeatures {
  id: string;
  acousticness: number;
  danceability: number;
  energy: number;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  valence: number;
  duration_ms: number;
}

export interface SpotifyDevice {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number | null;
}

export interface CurrentPlayback {
  device: SpotifyDevice;
  repeat_state: "off" | "track" | "context";
  shuffle_state: boolean;
  context: {
    type: string;
    href: string;
    external_urls: { spotify: string };
    uri: string;
  } | null;
  timestamp: number;
  progress_ms: number | null;
  is_playing: boolean;
  item: SpotifyTrack | null;
  currently_playing_type: "track" | "episode" | "ad" | "unknown";
}

export interface RecentlyPlayedItem {
  track: SpotifyTrack;
  played_at: string;
  context: {
    type: string;
    href: string;
    external_urls: { spotify: string };
    uri: string;
  } | null;
}

export interface SpotifyCategory {
  id: string;
  name: string;
  icons: SpotifyImage[];
}

export interface RecommendationOptions {
  limit?: number;
  seed_tracks?: string;
  seed_artists?: string;
  seed_genres?: string;
  min_acousticness?: number;
  max_acousticness?: number;
  target_acousticness?: number;
  min_danceability?: number;
  max_danceability?: number;
  target_danceability?: number;
  min_energy?: number;
  max_energy?: number;
  target_energy?: number;
  min_instrumentalness?: number;
  max_instrumentalness?: number;
  target_instrumentalness?: number;
  min_key?: number;
  max_key?: number;
  target_key?: number;
  min_liveness?: number;
  max_liveness?: number;
  target_liveness?: number;
  min_loudness?: number;
  max_loudness?: number;
  target_loudness?: number;
  min_mode?: number;
  max_mode?: number;
  target_mode?: number;
  min_popularity?: number;
  max_popularity?: number;
  target_popularity?: number;
  min_speechiness?: number;
  max_speechiness?: number;
  target_speechiness?: number;
  min_tempo?: number;
  max_tempo?: number;
  target_tempo?: number;
  min_time_signature?: number;
  max_time_signature?: number;
  target_time_signature?: number;
  min_valence?: number;
  max_valence?: number;
  target_valence?: number;
}

export interface PagingObject<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string | null;
  previous: string | null;
}

export interface SearchResult {
  tracks?: PagingObject<SpotifyTrack>;
  albums?: PagingObject<SpotifyAlbum>;
  artists?: PagingObject<SpotifyArtist>;
  playlists?: PagingObject<SpotifyPlaylist>;
}

export interface TopItemsResponse<T> extends PagingObject<T> {}

export class SpotifyService {
  private readonly baseURL: string = "https://api.spotify.com/v1";

  private getAuthHeaders(token: string): Record<string, string> {
    if (!token) {
      throw new Error("Access token is required");
    }
    const cleanToken = token.replace(/^Bearer\s+/i, "");
    return {
      Authorization: `Bearer ${cleanToken}`,
      "Content-Type": "application/json",
    };
  }

  private async makeRequest<T = any>(
    endpoint: string,
    token: string,
    params: Record<string, any> = {},
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    data: any = null
  ): Promise<T> {
    try {
      const url = endpoint.startsWith("http")
        ? endpoint
        : `${this.baseURL}/${endpoint}`;

      const config = {
        method,
        url,
        headers: this.getAuthHeaders(token),
        params: method === "GET" ? params : undefined,
        data: method !== "GET" ? data : undefined,
      };

      const response: AxiosResponse<T> = await axios(config);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const errorMessage =
          error.response.data?.error?.message || error.response.statusText;
        throw new Error(
          `Spotify API Error: ${error.response.status} - ${errorMessage}`
        );
      } else if (error.request) {
        throw new Error("Unable to connect to Spotify API");
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
  }

  private extractId(uriOrId: string): string {
    if (uriOrId.includes(":")) {
      return uriOrId.split(":").pop() || uriOrId;
    }
    return uriOrId;
  }

  async getUserProfile(token: string): Promise<SpotifyUser> {
    return await this.makeRequest<SpotifyUser>("me", token);
  }

  async getTopTracks(
    token: string,
    timeRange: "short_term" | "medium_term" | "long_term" = "medium_term",
    limit: number = 20
  ): Promise<TopItemsResponse<SpotifyTrack>> {
    const params = {
      time_range: timeRange,
      limit: Math.min(limit, 50),
    };
    return await this.makeRequest<TopItemsResponse<SpotifyTrack>>(
      "me/top/tracks",
      token,
      params
    );
  }

  async getTopArtists(
    token: string,
    timeRange: "short_term" | "medium_term" | "long_term" = "medium_term",
    limit: number = 20
  ): Promise<TopItemsResponse<SpotifyArtist>> {
    const params = {
      time_range: timeRange,
      limit: Math.min(limit, 50),
    };
    return await this.makeRequest<TopItemsResponse<SpotifyArtist>>(
      "me/top/artists",
      token,
      params
    );
  }

  async getFollowedArtists(
    token: string,
    limit: number = 20
  ): Promise<{ artists: PagingObject<SpotifyArtist> }> {
    const params = {
      type: "artist",
      limit: Math.min(limit, 50),
    };
    return await this.makeRequest<{ artists: PagingObject<SpotifyArtist> }>(
      "me/following",
      token,
      params
    );
  }

  async getAlbum(token: string, albumId: string): Promise<SpotifyAlbum> {
    const id = this.extractId(albumId);
    return await this.makeRequest<SpotifyAlbum>(`albums/${id}`, token);
  }

  async getAlbumTracks(
    token: string,
    albumId: string,
    limit: number = 50
  ): Promise<PagingObject<SpotifyTrack>> {
    const id = this.extractId(albumId);
    const params = { limit: Math.min(limit, 50) };
    return await this.makeRequest<PagingObject<SpotifyTrack>>(
      `albums/${id}/tracks`,
      token,
      params
    );
  }

  async getNewReleases(
    token: string,
    limit: number = 20,
    country: string | null = null
  ): Promise<{ albums: PagingObject<SpotifyAlbum> }> {
    const params: Record<string, any> = { limit: Math.min(limit, 50) };
    if (country) params.country = country;
    return await this.makeRequest<{ albums: PagingObject<SpotifyAlbum> }>(
      "browse/new-releases",
      token,
      params
    );
  }

  async searchAlbums(
    token: string,
    query: string,
    limit: number = 20
  ): Promise<SearchResult> {
    const params = {
      q: query,
      type: "album",
      limit: Math.min(limit, 50),
    };
    return await this.makeRequest<SearchResult>("search", token, params);
  }

  async getArtist(token: string, artistId: string): Promise<SpotifyArtist> {
    const id = this.extractId(artistId);
    return await this.makeRequest<SpotifyArtist>(`artists/${id}`, token);
  }

  async getArtistAlbums(
    token: string,
    artistId: string,
    albumType: "album" | "single" | "appears_on" | "compilation" = "album",
    limit: number = 20
  ): Promise<PagingObject<SpotifyAlbum>> {
    const id = this.extractId(artistId);
    const params = {
      include_groups: albumType,
      limit: Math.min(limit, 50),
    };
    return await this.makeRequest<PagingObject<SpotifyAlbum>>(
      `artists/${id}/albums`,
      token,
      params
    );
  }

  async getRelatedArtists(
    token: string,
    artistId: string
  ): Promise<{ artists: SpotifyArtist[] }> {
    const id = this.extractId(artistId);
    return await this.makeRequest<{ artists: SpotifyArtist[] }>(
      `artists/${id}/related-artists`,
      token
    );
  }

  async getArtistTopTracks(
    token: string,
    artistId: string,
    country: string = "US"
  ): Promise<{ tracks: SpotifyTrack[] }> {
    const id = this.extractId(artistId);
    const params = { market: country };
    return await this.makeRequest<{ tracks: SpotifyTrack[] }>(
      `artists/${id}/top-tracks`,
      token,
      params
    );
  }

  async searchArtists(
    token: string,
    query: string,
    limit: number = 20
  ): Promise<SearchResult> {
    const params = {
      q: query,
      type: "artist",
      limit: Math.min(limit, 50),
    };
    return await this.makeRequest<SearchResult>("search", token, params);
  }

  async getLikedTracks(
    token: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<PagingObject<{ added_at: string; track: SpotifyTrack }>> {
    const params = {
      limit: Math.min(limit, 50),
      offset: offset,
    };
    return await this.makeRequest<
      PagingObject<{ added_at: string; track: SpotifyTrack }>
    >("me/tracks", token, params);
  }

  async saveTracks(token: string, trackIds: string | string[]): Promise<void> {
    const ids = Array.isArray(trackIds)
      ? trackIds.map((id) => this.extractId(id))
      : [this.extractId(trackIds)];
    const params = { ids: ids.join(",") };
    return await this.makeRequest<void>("me/tracks", token, params, "PUT");
  }

  async removeTracks(
    token: string,
    trackIds: string | string[]
  ): Promise<void> {
    const ids = Array.isArray(trackIds)
      ? trackIds.map((id) => this.extractId(id))
      : [this.extractId(trackIds)];
    const params = { ids: ids.join(",") };
    return await this.makeRequest<void>("me/tracks", token, params, "DELETE");
  }

  async getTrack(token: string, trackId: string): Promise<SpotifyTrack> {
    const id = this.extractId(trackId);
    return await this.makeRequest<SpotifyTrack>(`tracks/${id}`, token);
  }

  async getAudioFeatures(
    token: string,
    trackId: string
  ): Promise<AudioFeatures> {
    const id = this.extractId(trackId);
    return await this.makeRequest<AudioFeatures>(`audio-features/${id}`, token);
  }

  async searchTracks(
    token: string,
    query: string,
    limit: number = 20
  ): Promise<SearchResult> {
    const params = {
      q: query,
      type: "track",
      limit: Math.min(limit, 50),
    };
    return await this.makeRequest<SearchResult>("search", token, params);
  }

  async searchMusic(
    token: string,
    query: string,
    type: "track" | "album" | "artist" | "playlist" = "track",
    limit: number = 10
  ): Promise<SearchResult> {
    const params = {
      q: query,
      type: type,
      limit: Math.min(limit, 50),
    };
    return await this.makeRequest<SearchResult>("search", token, params);
  }

  async getRecommendations(
    token: string,
    options: RecommendationOptions = {}
  ): Promise<{ tracks: SpotifyTrack[]; seeds: any[] }> {
    const params = {
      limit: Math.min(options.limit || 20, 100),
      ...options,
    };
    return await this.makeRequest<{ tracks: SpotifyTrack[]; seeds: any[] }>(
      "recommendations",
      token,
      params
    );
  }

  async getUserPlaylists(
    token: string,
    limit: number = 20
  ): Promise<PagingObject<SpotifyPlaylist>> {
    return await this.makeRequest<PagingObject<SpotifyPlaylist>>(
      "me/playlists",
      token,
      { limit }
    );
  }

  async getPlaylist(
    token: string,
    playlistId: string
  ): Promise<SpotifyPlaylist> {
    const id = this.extractId(playlistId);
    return await this.makeRequest<SpotifyPlaylist>(`playlists/${id}`, token);
  }

  async getPlaylistTracks(
    token: string,
    playlistId: string,
    limit: number = 50
  ): Promise<PagingObject<PlaylistTrack>> {
    const id = this.extractId(playlistId);
    const params = { limit: Math.min(limit, 50) };
    return await this.makeRequest<PagingObject<PlaylistTrack>>(
      `playlists/${id}/tracks`,
      token,
      params
    );
  }

  async createPlaylist(
    token: string,
    name: string,
    description: string = "",
    isPublic: boolean = true
  ): Promise<SpotifyPlaylist> {
    const userProfile = await this.getUserProfile(token);
    const userId = userProfile.id;

    const data = {
      name,
      description,
      public: isPublic,
    };
    return await this.makeRequest<SpotifyPlaylist>(
      `users/${userId}/playlists`,
      token,
      {},
      "POST",
      data
    );
  }

  async addTracksToPlaylist(
    token: string,
    playlistId: string,
    trackUris: string | string[]
  ): Promise<{ snapshot_id: string }> {
    const id = this.extractId(playlistId);
    const data = {
      uris: Array.isArray(trackUris) ? trackUris : [trackUris],
    };
    return await this.makeRequest<{ snapshot_id: string }>(
      `playlists/${id}/tracks`,
      token,
      {},
      "POST",
      data
    );
  }

  async removeTracksFromPlaylist(
    token: string,
    playlistId: string,
    trackUris: string | string[]
  ): Promise<{ snapshot_id: string }> {
    const id = this.extractId(playlistId);
    const data = {
      tracks: (Array.isArray(trackUris) ? trackUris : [trackUris]).map(
        (uri) => ({ uri })
      ),
    };
    return await this.makeRequest<{ snapshot_id: string }>(
      `playlists/${id}/tracks`,
      token,
      {},
      "DELETE",
      data
    );
  }

  async searchPlaylists(
    token: string,
    query: string,
    limit: number = 20
  ): Promise<SearchResult> {
    const params = {
      q: query,
      type: "playlist",
      limit: Math.min(limit, 50),
    };
    return await this.makeRequest<SearchResult>("search", token, params);
  }

  async getCurrentPlayback(token: string): Promise<CurrentPlayback | null> {
    return await this.makeRequest<CurrentPlayback | null>("me/player", token);
  }

  async getRecentlyPlayed(
    token: string,
    limit: number = 20
  ): Promise<PagingObject<RecentlyPlayedItem>> {
    const params = {
      limit: Math.min(limit, 50),
    };
    return await this.makeRequest<PagingObject<RecentlyPlayedItem>>(
      "me/player/recently-played",
      token,
      params
    );
  }

  async addToQueue(
    token: string,
    trackUri: string,
    deviceId: string | null = null
  ): Promise<void> {
    let endpoint = `me/player/queue?uri=${encodeURIComponent(trackUri)}`;
    if (deviceId) {
      endpoint += `&device_id=${deviceId}`;
    }
    return await this.makeRequest<void>(endpoint, token, {}, "POST");
  }

  async playMusic(
    token: string,
    trackUris: string | string[] | null = null,
    contextUri: string | null = null,
    deviceId: string | null = null
  ): Promise<void> {
    const data: Record<string, any> = {};

    if (trackUris) {
      data.uris = Array.isArray(trackUris)
        ? trackUris
        : [`spotify:track:${this.extractId(trackUris)}`];
    }

    if (contextUri) {
      data.context_uri = contextUri;
    }

    const endpoint = deviceId
      ? `me/player/play?device_id=${deviceId}`
      : "me/player/play";

    return await this.makeRequest<void>(endpoint, token, {}, "PUT", data);
  }

  async pausePlayback(
    token: string,
    deviceId: string | null = null
  ): Promise<void> {
    const endpoint = deviceId
      ? `me/player/pause?device_id=${deviceId}`
      : "me/player/pause";
    return await this.makeRequest<void>(endpoint, token, {}, "PUT");
  }

  async resumePlayback(
    token: string,
    contextUri: string | null = null,
    trackUris: string | string[] | null = null,
    deviceId: string | null = null
  ): Promise<void> {
    return await this.playMusic(token, trackUris, contextUri, deviceId);
  }

  async skipToNext(
    token: string,
    deviceId: string | null = null
  ): Promise<void> {
    const endpoint = deviceId
      ? `me/player/next?device_id=${deviceId}`
      : "me/player/next";
    return await this.makeRequest<void>(endpoint, token, {}, "POST");
  }

  async skipToPrevious(
    token: string,
    deviceId: string | null = null
  ): Promise<void> {
    const endpoint = deviceId
      ? `me/player/previous?device_id=${deviceId}`
      : "me/player/previous";
    return await this.makeRequest<void>(endpoint, token, {}, "POST");
  }

  async setVolume(
    token: string,
    volumePercent: number,
    deviceId: string | null = null
  ): Promise<void> {
    const volume = Math.min(Math.max(volumePercent, 0), 100);
    let endpoint = `me/player/volume?volume_percent=${volume}`;
    if (deviceId) {
      endpoint += `&device_id=${deviceId}`;
    }
    return await this.makeRequest<void>(endpoint, token, {}, "PUT");
  }

  async getUserDevices(token: string): Promise<{ devices: SpotifyDevice[] }> {
    return await this.makeRequest<{ devices: SpotifyDevice[] }>(
      "me/player/devices",
      token
    );
  }

  async transferPlayback(
    token: string,
    deviceId: string,
    play: boolean = false
  ): Promise<void> {
    const data = {
      device_ids: [deviceId],
      play: play,
    };
    return await this.makeRequest<void>("me/player", token, {}, "PUT", data);
  }

  async getCategories(
    token: string,
    limit: number = 20,
    country: string | null = null
  ): Promise<{ categories: PagingObject<SpotifyCategory> }> {
    const params: Record<string, any> = { limit: Math.min(limit, 50) };
    if (country) params.country = country;
    return await this.makeRequest<{
      categories: PagingObject<SpotifyCategory>;
    }>("browse/categories", token, params);
  }
  async savePlaylist(token: string, playlistId: string): Promise<void> {
    const id = this.extractId(playlistId);
    return await this.makeRequest<void>(
      `playlists/${id}/followers`,
      token,
      {},
      "PUT"
    );
  }

  async unsavePlaylist(token: string, playlistId: string): Promise<void> {
    const id = this.extractId(playlistId);
    return await this.makeRequest<void>(
      `playlists/${id}/followers`,
      token,
      {},
      "DELETE"
    );
  }
}
