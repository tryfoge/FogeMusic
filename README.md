# 🎶 ForgeMusic

> **Welcome to ForgeMusic**, the official extension library that brings powerful music playability features to your Discord applications using [ForgeScript](https://github.com/tryforge/ForgeScript).

![ForgeMusic](https://img.shields.io/github/package-json/v/tryfoge/FogeMusic/main?label=forge-music&color=5c16d4) ![ForgeScript](https://img.shields.io/github/package-json/v/tryforge/ForgeScript/main?label=@tryforge/forgescript&color=5c16d4) ![Discord](https://img.shields.io/discord/739934735387721768?logo=discord)

## 🌟 Features

- **Track Queue System**: Seamlessly manage and play music tracks in a queue.
- **Audio Player Controls**: Play, pause, stop, and seek through tracks.
- **Music Events**: Listen and react to events like play, pause, resume, stop, and more.
- **Extensive Provider Support**: Integrate with a variety of music platforms.
- **FFMPEG Audio Filters**: Apply audio filters using FFMPEG for enhanced listening.

---

## 🚀 Installation

You can install the package from GitHub or via Node's package manager:

### From GitHub:
```bash
npm install https://github.com/tryfoge/ForgeMusic.git
```

### From Node Package Manager (NPM/Yarn):
```bash
# NPM
npm install forge-music
# Yarn
yarn add forge-music
```

---

## ⚙️ Usage

To use `ForgeMusic` in your project, simply add it to your Discord client:

```js
const { ForgeMusic } = require('forge-music');
const { ForgeClient } = require('@tryforge/forgescript');

const client = new ForgeClient({
    intents: [
        "Guilds", 
        "GuildMessages", 
        "MessageContent", 
        "GuildVoiceStates" // Important for music functionality
    ],
    extension: [
        new ForgeMusic({ soundsFolder: `${process.cwd()}/sounds` })
    ]
});
```

> The `ForgeMusic` extension is exposed through `client.music`, and its functions are available in your bot's command structure.

---

## 🎵 Available Commands

### 1. **Join a Voice Channel**
   - `$vcJoin[voiceChannel]`: Connects to a voice channel.
     - `voiceChannel` (Channel) – The target voice channel.

### 2. **Change Default Provider**
   - `$defaultProvider[providerName]`: Sets the default music provider.
     - `providerName` (String) – Name of the music provider.

### 3. **Get Sounds Folder**
   - `$getSoundsFolder`: Retrieves the `soundsFolder` specified in the options.

### 4. **Get Track Information**
   - `$getTrackInfo[track encoded id;record key]`: Fetches track info.
     - `track encoded id` (String) – The ID of the track from cache.
     - `record key` (String) – The key to retrieve information from.

### 5. **Search for Tracks**
   - `$loadTracks[query;loadType;providerName?]`: Search for tracks.
     - `query` (String) – Your search query.
     - `loadType` (Enum: LoadResultType) – Filter results by `Search`, `Track`, or `Playlist`.

### 6. **Play a Track**
   - `$playTrack[track encoded id]`: Plays the selected track.
     - `track encoded id` (String) – The track ID from cache.

### 7. **Stop Audio Player**
   - `$playerStop`: Stops the current audio playback.

---

## 📚 API Overview

### `ForgeMusic`

- **`ForgeMusic.options`**: Configuration options for the extension.
   - `soundsFolder`: Path to the sounds folder.
  
- **`ForgeMusic.manager`**: Manages tracks and audio players.
  - The class manager comes from [NaokoPlayer](https://github.com/KairoKunazuki/NaokoPlayer).

- **`ForgeMusic.addProvider(Provider)`**: Add custom providers to the collection.
  - `Provider` is a class from [NaokoPlayer](https://github.com/KairoKunazuki/NaokoPlayer).

---

## 🛠️ Roadmap

- **Track Queue System**: Improved queue management features.
- **Advanced Audio Player Features**: Filter, seek, and more.
- **Music Events**: Support for playback-related events.
- **Enhanced Provider Support**: Integration with additional music platforms.
- **Caching and Performance Enhancements**: Resource caching and performance tweaks.

---

## 🔄 Changelog

### **Version [1.0.0] - 2024-09-14**

#### Added:
- Core track queue system.
- Audio player controls: play, pause, stop, seek.
- Music events for handling play, resume, pause, and stop actions.
- Extensive provider support for various music services.
- FFMPEG-based audio filters.

#### Updated:
- Advanced features like filtering and seeking.
- Initial API groundwork laid for further development.
- Improvements to abstract classes and resource caching.

---

## 💻 Contributions

| Contributor      | Role                                     | Contact                                                                                      |
|------------------|------------------------------------------|----------------------------------------------------------------------------------------------|
| **RelevantZone** | Developer & Core Features                | [GitHub](https://github.com/RelevantZone)                                                    |
| **Clyders**      | Developer & Feature Enhancements         | [GitHub](https://github.com/Clyders) \| [Discord](https://discord.com/users/903681538842054686) |