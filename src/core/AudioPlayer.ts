import { MusicManager, Providers } from "naoko-player";
import { PassThrough } from "stream";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import Speaker from "audio-speaker"; // Using audio-speaker for audio playback

export class AudioPlayer {
    private provider: Providers.Provider;
    private manager: MusicManager;
    private currentTrack: Track | null = null;
    private isPlaying: boolean = false;
    private isPaused: boolean = false;
    private audioStream: NodeJS.ReadableStream | null = null;
    private playbackProcess: any;
    private soundsFolder: string;

    constructor(provider: Providers.Provider, manager: MusicManager, soundsFolder: string) {
        this.provider = provider;
        this.manager = manager;
        this.soundsFolder = soundsFolder; // Set the sounds folder path
    }

    async playTrack(trackId: string) {
        if (this.isPlaying) {
            await this.stopTrack();
        }

        const track = await this.provider.getTrackDetails(trackId);
        if (track) {
            this.currentTrack = track;
            this.isPlaying = true;
            this.isPaused = false;

            const inputFile = path.join(this.soundsFolder, `${trackId}.mp3`); // Use the sounds folder
            const outputFile = path.join(process.cwd(), 'temp', `${trackId}.wav`); // Temporary WAV file

            const outputDir = path.dirname(outputFile);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            this.playbackProcess = exec(`ffmpeg -i ${inputFile} -f wav ${outputFile}`, (error) => {
                if (error) {
                    console.error(`Error processing track: ${error.message}`);
                    return;
                }

                this.audioStream = fs.createReadStream(outputFile);
                const passThrough = new PassThrough();
                this.audioStream.pipe(passThrough);

                // Handle audio data and playback
                passThrough.pipe(Speaker({
                    channels: 2,
                    sampleRate: 44100,
                    byteOrder: 'LE',
                    bitDepth: 16,
                    signed: true,
                    float: false,
                    interleaved: true
                }));

                passThrough.on('data', (chunk) => {
                    console.log(`Playing ${chunk.length} bytes of data`);
                });

                passThrough.on('end', () => {
                    console.log(`Finished playing track: ${track.title}`);
                    this.stopTrack(); // Automatically stop when finished
                });

                console.log(`Playing track: ${track.title}`);
            });

        } else {
            console.log(`Track not found: ${trackId}`);
        }
    }

    async pauseTrack() {
        if (this.isPlaying && !this.isPaused) {
            this.isPaused = true;
            if (this.audioStream) {
                this.audioStream.pause(); // Pause the input stream
            }
            console.log(`Track paused.`);
        }
    }

    async resumeTrack() {
        if (this.isPlaying && this.isPaused) {
            this.isPaused = false;
            if (this.audioStream) {
                this.audioStream.resume(); // Resume the input stream
            }
            console.log(`Track resumed.`);
        }
    }

    async stopTrack() {
        if (this.isPlaying) {
            this.isPlaying = false;
            this.isPaused = false;
            if (this.audioStream) {
                this.audioStream.destroy();
            }
            if (this.playbackProcess) {
                this.playbackProcess.kill(); // Stop the ffmpeg process
            }
            this.currentTrack = null;
            console.log(`Track stopped.`);
        }
    }
}
