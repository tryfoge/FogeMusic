import { Providers } from "naoko-player";

export abstract class AbstractMusicProvider extends Providers.Provider {
    /**
     * Searches for tracks based on a query and type.
     * @param query The search query for the tracks.
     * @param type The type of search (e.g., track, playlist).
     * @returns A promise that resolves to an array of search results.
     */
    abstract searchTracks(query: string, type: string): Promise<any[]>;

    /**
     * Retrieves additional information about a track.
     * @param trackId The ID of the track to get information about.
     * @param infoKey The specific information key to retrieve.
     * @returns A promise that resolves to the requested information.
     */
    abstract getTrackInfo(trackId: string, infoKey: string): Promise<any>;

    /**
     * Plays a track using the provided ID.
     * @param trackId The ID of the track to play.
     * @returns A promise that resolves when the track starts playing.
     */
    abstract playTrack(trackId: string): Promise<void>;

    /**
     * Stops the currently playing track.
     * @returns A promise that resolves when the track has been stopped.
     */
    abstract stopTrack(): Promise<void>;

    /**
     * Pauses the currently playing track.
     * @returns A promise that resolves when the track has been paused.
     */
    abstract pauseTrack(): Promise<void>;

    /**
     * Resumes a paused track.
     * @returns A promise that resolves when the track has been resumed.
     */
    abstract resumeTrack(): Promise<void>;
}
