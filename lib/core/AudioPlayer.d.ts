import { Providers, MusicManager, Track } from "naoko-player";

export class AudioPlayer {
    private provider: Providers.Provider;
    private manager: MusicManager;
    private currentTrack: Track | null;
    private isPlaying: boolean;
    private isPaused: boolean;
    private audioStream: NodeJS.ReadableStream | null;
    private playbackProcess: any;
    private soundsFolder: string;

    constructor(provider: Providers.Provider, manager: MusicManager, soundsFolder: string);

    playTrack(trackId: string): Promise<void>;

    pauseTrack(): Promise<void>;

    resumeTrack(): Promise<void>;

    stopTrack(): Promise<void>;
}
