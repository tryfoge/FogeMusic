import { z } from "zod";

export const TrackInfo = z.object(
    {
        sourceId: z.string(),
        sourceName: z.string(),
        sourceUrl: z.string(),
        title: z.string(),
        description: z.string(),
        duration: z.number(),
        author: z.object({ name: z.string(), url: z.string() }),
        artworkUrl: z.string(),
        isStream: z.boolean()
    }
)

export type TrackInfo = z.infer<typeof TrackInfo>