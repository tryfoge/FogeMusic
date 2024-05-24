import { createAudioPlayer, createAudioResource, StreamType } from "@discordjs/voice";
import Resource from "./Resource";
import { PassThrough } from "stream";
import { FFmpeg } from "prism-media";

class AudioPlayer {
    public readonly voiceAudioPlayer = createAudioPlayer()

    public play(resource: Resource) {
        console.log('Received play request')
        const audioResource = this.createAudioResource()
        
        resource.decoder.pipe(audioResource.metadata)
        this.voiceAudioPlayer.play(audioResource)
    }

    private createAudioResource(stream: PassThrough | FFmpeg = new PassThrough(), inputType: StreamType = StreamType.Raw) {
        return createAudioResource(stream, {
            metadata: stream,
            inlineVolume: true,
            inputType: inputType
        })
    }
}

export default AudioPlayer