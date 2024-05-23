import { TrackInfo as validator, type TrackInfo } from "../utils/validators/track"

class Track {
    private readonly _data: TrackInfo
    public constructor(data: TrackInfo) {
        this._data = validator.parse(data)
    }

    public get<K extends keyof TrackInfo>(key: K): TrackInfo[K] {
        return this._data[key]
    }
}

export default Track