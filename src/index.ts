import Plugin from "./structures/Plugin";
import Search from "./structures/Search";
import Track from "./structures/Track";
import Resource from "./structures/Resource";

import { serialize as encodeTrack, deserialize as decodeTrack } from "./utils/constants/track-info";
import { ResultTypes as SearchResultTypes } from "./utils/constants/search-enums";
import { SearchError } from "./utils/constants/errors";

import { 
    Result, 
    ResultType, 
    ResultError, 
    ResultSearch, 
    ResultTrack 
} from "./utils/types/search";

import { SearchOptions } from "./utils/types/plugin";
import { TrackInfo } from "./utils/validators/track";
import { ResourceOptions } from "./utils/validators/resource";

import Youtube from "./providers/youtube/Youtube";
import AudioPlayer from "./structures/AudioPlayer";
export {
    Plugin,
    Search,
    Track,
    Resource,
    AudioPlayer,

    SearchError,

    SearchResultTypes,
    encodeTrack,
    decodeTrack,

    type SearchOptions,
    type TrackInfo,
    type ResourceOptions,
    type Result,
    type ResultType,
    type ResultSearch,
    type ResultTrack,
    type ResultError,

    // Providers
    Youtube
}