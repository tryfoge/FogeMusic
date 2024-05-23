import { ResultTypes as Type } from "../constants/search-enums";
import { TrackInfo } from "../validators/track";

export type ResultType = ("search" | "track" | "playlist" | "empty" | "error") | Type

export interface ResultSearch {
    type: "search" | Type.Search
    data: Array<TrackInfo>
}

export interface ResultTrack {
    type: "track" | Type.Track
    data: TrackInfo
}

export interface ResultError {
    type: "error" | Type.Error
    data: {
        message: string
        severity: string
        cause: string
    }
}

export type Result =
    ResultSearch |
    ResultTrack |
    ResultError