# Spotify MCP Service (TypeScript)

Bu proje, Spotify API'si ile entegre olmuş bir MCP (Model Context Protocol) servisidir ve TypeScript ile yazılmıştır.

## Özellikler

- **Tam TypeScript Desteği**: Güçlü tip güvenliği ve geliştirici deneyimi
- **Spotify Web API Entegrasyonu**: Kapsamlı müzik işlevselliği
- **MCP Protokolü**: Claude Desktop ile uyumlu
- **Çeşitli Müzik İşlemleri**: Arama, çalma, playlist yönetimi ve daha fazlası

## Kurulum

### Gereksinimler

- Node.js (v18 veya üzeri)
- npm veya yarn
- Spotify Developer hesabı ve API anahtarları

### Bağımlılıkları Yükleme

```bash
npm install
```

### TypeScript Projesini Build Etme

```bash
npm run build
```

### Çalıştırma

```bash
# Production build'i çalıştır
npm start

# Geliştirme modu (otomatik yeniden başlatma)
npm run dev
```

## TypeScript Yapısı

Proje şu TypeScript dosyalarını içerir:

- `src/spotify.ts` - Ana Spotify API service sınıfı ve tip tanımlamaları
- `src/mcp/server.ts` - MCP server implementasyonu ve handler'lar
- `src/mcp/tools-definitions.ts` - Tool tanımlamaları ve şemaları
- `tsconfig.json` - TypeScript konfigürasyonu

## Tip Güvenliği

Proje, Spotify API response'ları için kapsamlı tip tanımlamaları içerir:

- `SpotifyTrack` - Şarkı bilgileri
- `SpotifyArtist` - Sanatçı bilgileri
- `SpotifyAlbum` - Albüm bilgileri
- `SpotifyPlaylist` - Playlist bilgileri
- `AudioFeatures` - Ses özellik analizi
- Ve daha fazlası...

## Geliştirme

### Kodun Type Check Edilmesi

```bash
npx tsc --noEmit
```

### Watch Modu ile Geliştirme

```bash
npm run dev
```

## Kullanılan Araçlar

- **TypeScript 5.3+** - Tip güvenliği
- **tsx** - TypeScript runtime
- **Zod** - Runtime tip validasyonu
- **Axios** - HTTP client (tipli)
- **@modelcontextprotocol/sdk** - MCP framework

## API Referansı

### Desteklenen Tool'lar

Servis 40+ müzik tool'u destekler:

#### Kullanıcı İşlemleri

- `get_user_profile` - Kullanıcı profil bilgileri
- `get_top_tracks` - En çok dinlenen şarkılar
- `get_top_artists` - En çok dinlenen sanatçılar

#### Müzik Arama

- `search_tracks` - Şarkı arama
- `search_artists` - Sanatçı arama
- `search_albums` - Albüm arama
- `search_playlists` - Playlist arama

#### Playback Kontrolü

- `start_playback` - Müzik çalmayı başlat
- `pause_player` - Duraklat
- `skip_to_next` - Sonraki şarkı
- `skip_to_previous` - Önceki şarkı
- `set_volume` - Ses seviyesi

#### Playlist Yönetimi

- `create_playlist` - Yeni playlist oluştur
- `add_to_playlist` - Playlist'e şarkı ekle
- `remove_from_playlist` - Playlist'ten şarkı çıkar
- `get_playlist_tracks` - Playlist şarkıları

Ve daha fazlası...

## Hata Ayıklama

TypeScript derleyici hataları:

```bash
npm run build
```

Runtime hataları için log'ları kontrol edin:

```bash
npm start
```

## Lisans

MIT
