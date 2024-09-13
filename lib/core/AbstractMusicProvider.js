"use strict";
const { Providers } = require("naoko-player");

class AbstractMusicProvider extends Providers.Provider {
    /**
     * Searches for tracks based on a query and type.
     * @param {string} query The search query for the tracks.
     * @param {string} type The type of search (e.g., track, playlist).
     * @returns {Promise<any[]>} A promise that resolves to an array of search results.
     */
    searchTracks(query, type) {
        throw new Error("Method not implemented.");
    }

    /**
     * Retrieves additional information about a track.
     * @param {string} trackId The ID of the track to get information about.
     * @param {string} infoKey The specific information key to retrieve.
     * @returns {Promise<any>} A promise that resolves to the requested information.
     */
    getTrackInfo(trackId, infoKey) {
        throw new Error("Method not implemented.");
    }

    /**
     * Plays a track using the provided ID.
     * @param {string} trackId The ID of the track to play.
     * @returns {Promise<void>} A promise that resolves when the track starts playing.
     */
    playTrack(trackId) {
        throw new Error("Method not implemented.");
    }

    /**
     * Stops the currently playing track.
     * @returns {Promise<void>} A promise that resolves when the track has been stopped.
     */
    stopTrack() {
        throw new Error("Method not implemented.");
    }

    /**
     * Pauses the currently playing track.
     * @returns {Promise<void>} A promise that resolves when the track has been paused.
     */
    pauseTrack() {
        throw new Error("Method not implemented.");
    }

    /**
     * Resumes a paused track.
     * @returns {Promise<void>} A promise that resolves when the track has been resumed.
     */
    resumeTrack() {
        throw new Error("Method not implemented.");
    }
}

module.exports = AbstractMusicProvider;
