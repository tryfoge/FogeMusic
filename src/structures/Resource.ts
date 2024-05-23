import { FFmpeg, opus, vorbis } from "prism-media";
import Cache from "../cache/Cache";
import Track from "./Track";

import { ResourceOptions, ResourceOptions as validator } from "../utils/validators/resource";
import { TrackInfo as validatorMetadata } from "../utils/validators/track";
import { pipeline } from "stream";
import { noop } from "../utils/constants/noop";

const opusFrameSize = 960
const opusChannels = 2
const opusCDRate = 48000

class Resource<T = unknown> {
    // #cache: Cache
    #demuxer?: opus.WebmDemuxer | opus.OggDemuxer | vorbis.WebmDemuxer
    #decoder: opus.Decoder | FFmpeg
    #encoder: opus.Encoder
    #track: Track
    public metadata: T
    public constructor(options: ResourceOptions) {
        const { decoder, demuxer, track } = validator.parse(options)

        this.#decoder = decoder
        this.#demuxer = demuxer
        this.#track = track
        this.#encoder = Resource.createOpusEncoder()

        if (this.#demuxer) pipeline(this.#demuxer, this.#decoder, noop)
    }

    public get track() { return this.#track }
    public get decoder() { return this.#decoder }
    public get encoder() { return this.#encoder }

    static createOpusEncoder() {
        return new opus.Encoder({ frameSize: opusFrameSize, channels: opusChannels, rate: opusCDRate })
    }

    static createOpusDecoder() {
        return new opus.Decoder({ frameSize: opusFrameSize, channels: opusChannels, rate: opusCDRate })
    }
}

export default Resource