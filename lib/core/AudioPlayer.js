"use strict";

const { PassThrough } = require("stream");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const Speaker = require("audio-speaker"); // Using audio-speaker for audio playback

class AudioPlayer {
    constructor(provider, manager, soundsFolder) {
        this.provider = provider;
        this.manager = manager;
        this.soundsFolder = soundsFolder; // Set the sounds folder path
        this.currentTrack = null;
        this.isPlaying = false;
        this.isPaused = false;
        this.audioStream = null;
        this.playbackProcess = null;
    }

    async playTrack(trackId) {
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

module.exports = AudioPlayer;
