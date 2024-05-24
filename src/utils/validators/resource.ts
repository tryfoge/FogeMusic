import { z } from "zod";
import { FFmpeg, opus, vorbis } from "prism-media";
import Track from "../../structures/Track";
import { Readable } from "stream";

export const ResourceOptions = z.object(
    {
        // cache: z.instanceof(Cache),
        source: z.instanceof(Readable),
        demuxer: z.optional(
            z.union(
                [
                    z.instanceof(opus.WebmDemuxer),
                    z.instanceof(opus.OggDemuxer),
                    z.instanceof(vorbis.WebmDemuxer)
                ]
            )
        ),
        decoder: z.union([z.instanceof(opus.Decoder), z.instanceof(FFmpeg)]),
        track: z.instanceof(Track)
    }
)

export type ResourceOptions = z.infer<typeof ResourceOptions>