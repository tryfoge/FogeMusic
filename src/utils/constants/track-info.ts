import { DataReader, DataWriter } from "@lavacoffee/datarw";
import { SignatureDetailsDecoder, SignatureDetailsEncoder } from "../types/track";
import { TrackInfo } from "../validators/track";
import Track from "../../structures/Track";

export const TrackInfoVersioned = 1
export const TrackInfoVersion = 2

export function serialize(info: TrackInfo, encodeTrackDetails?: SignatureDetailsEncoder) {
    const writer = new DataWriter()

    writer.write(TrackInfoVersion)
    writer.writeUTF(info.title)
    writer.writeUTF(info.author.name)
    writer.writeLong(info.duration)
    writer.writeUTF(info.sourceId)
    writer.writeUTF(info.sourceUrl)
    writer.writeUTF(info.sourceName)

    if (typeof encodeTrackDetails === "function") {
        encodeTrackDetails(writer, info)
    }

    return writer.finish(TrackInfoVersioned)
}

export function deserialize(data: string | Uint8Array | DataReader, decodeTrackDetails?: SignatureDetailsDecoder) {
    if (typeof data === 'string') {
        data = Buffer.from(data, 'base64')
    }
    
    const reader = data instanceof DataReader ? data : new DataReader(data)

    reader.read()
    const info: TrackInfo = {
        title: reader.readUTF(),
        author: { name: reader.readUTF(), url: '' },
        duration: reader.readLong(),
        sourceId: reader.readUTF(),
        isStream: reader.readBool(),
        sourceUrl: reader.readUTF(),
        sourceName: reader.readUTF()
    }

    if (typeof decodeTrackDetails === "function") {
        const details = decodeTrackDetails(reader, info.sourceName)

        if (typeof details !== "undefined") {
            Object.assign(info, details)
        }
    }

    reader.readLong() // Track Position
    return info
}

export function getSourceInfo(data: string | Uint8Array | DataReader) {
    if (typeof data === 'string') {
        data = Buffer.from(data, 'base64')
    }
    
    const reader = data instanceof DataReader ? data : new DataReader(data)
    reader.read() // TrackInfoVersion
    reader.readUTF() // Title
    reader.readUTF() // Author name
    reader.readLong() // Duration
    
    const sourceId = reader.readUTF()
    reader.readBool() // is stream
    const sourceUrl = reader.readUTF()
    const sourceName = reader.readUTF()

    return { sourceId, sourceUrl, sourceName }
}