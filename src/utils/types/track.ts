import { DataReader, DataWriter } from "@lavacoffee/datarw";
import { TrackInfo } from "../validators/track";

export type SignatureDetailsEncoder = 
    <T = Record<string, unknown>>(writer: DataWriter, metadata: TrackInfo & T) => void
    export type SignatureDetailsDecoder = 
    <T = Record<string, unknown>>(reader: DataReader, sourceName: string) => T | undefined