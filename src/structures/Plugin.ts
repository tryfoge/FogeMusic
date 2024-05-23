import { SearchOptions } from "../utils/types/plugin"
import { TrackInfo } from "../utils/validators/track"
import Resource from "./Resource"
import Search from "./Search"
import Track from "./Track"

abstract class Plugin<T extends Track = Track> {
    abstract name: Readonly<string>
    abstract description: Readonly<string>
    abstract version: Readonly<string>

    abstract decodeTrack(encoded: string): T
    abstract encodeTrack(track: T): string
    abstract buildTrack(metadata: TrackInfo): T
    abstract createResource(track: T): Promise<Resource>
    abstract search(options: SearchOptions): Search<T>
}

export default Plugin