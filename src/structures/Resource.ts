import { FFmpeg, opus, vorbis } from "prism-media";
import Cache from "../cache/Cache";
import Track from "./Track";

import { ResourceOptions, ResourceOptions as validator } from "../utils/validators/resource";
import { TrackInfo as validatorMetadata } from "../utils/validators/track";
import { pipeline, Readable } from "stream";
import { noop } from "../utils/constants/noop";

const frameSize = 960
const CDQualityChannels = 2
const CDQualityRate = 48000

class Resource<T = unknown> {
    // #cache: Cache
    #source: Readable
    #demuxer?: opus.WebmDemuxer | opus.OggDemuxer | vorbis.WebmDemuxer
    #decoder: opus.Decoder | FFmpeg
    // #encoder: opus.Encoder
    #track: Track
    public metadata: T
    public constructor(options: ResourceOptions) {
        const { source, decoder, demuxer, track } = validator.parse(options)

        this.#source = source
        this.#decoder = decoder
        this.#demuxer = demuxer
        this.#track = track

        if (this.#demuxer) pipeline(source, this.#demuxer, this.#decoder, noop)
            else pipeline(source, this.#decoder, noop)
    }

    public get track() { return this.#track }
    public get decoder() { return this.#decoder }
    public get source() { return this.#source }
    // public get encoder() { return this.#encoder }
    // public set encoder(opusEncoder: opus.Encoder) {
    //     if (this.#encoder) {
    //         this.#decoder.unpipe(this.#encoder)
    //     }
    //     this.#encoder = opusEncoder
    //     this.#decoder.pipe(this.#encoder)
    // }

    public destroy() {
        this.#source.destroy()
        this.#decoder.destroy()
        if (this.#demuxer) this.#demuxer.destroy()
    }

    static createOpusEncoder() {
        return new opus.Encoder({ frameSize: frameSize, channels: CDQualityChannels, rate: CDQualityRate })
    }

    static createOpusDecoder() {
        return new opus.Decoder({ frameSize: frameSize, channels: CDQualityChannels, rate: CDQualityRate })
    }
}

export default Resource